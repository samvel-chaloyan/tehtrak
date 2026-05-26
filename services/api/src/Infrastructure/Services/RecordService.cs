using System.Text;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Tehtrak.Application.Abstractions;
using Tehtrak.Application.Authorization;
using Tehtrak.Application.Common;
using Tehtrak.Application.DTOs;
using Tehtrak.Application.Validation;
using Tehtrak.Domain.Entities;
using Tehtrak.Domain.Enums;
using Tehtrak.Infrastructure.Mapping;
using Tehtrak.Infrastructure.Persistence;

namespace Tehtrak.Infrastructure.Services;

public sealed class RecordService(
    TehtrakDbContext db,
    IWorkspaceAuthorizationService auth) : IRecordService
{
    public async Task<(IReadOnlyList<RecordDto> Items, PaginationMeta Meta)> ListAsync(
        Guid userId,
        Guid workspaceId,
        Guid collectionId,
        string? cursor,
        int limit,
        string? search,
        CancellationToken ct = default)
    {
        await auth.RequireMembershipAsync(workspaceId, userId, ct);
        await EnsureCollectionAsync(workspaceId, collectionId, ct);

        limit = Math.Clamp(limit, 1, 100);
        var query = db.Records.AsNoTracking()
            .Where(r => r.CollectionId == collectionId && r.WorkspaceId == workspaceId && r.DeletedAt == null);

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim().ToLowerInvariant();
            query = query.Where(r => EF.Functions.ILike(r.Data.RootElement.GetRawText(), $"%{term}%"));
        }

        if (!string.IsNullOrWhiteSpace(cursor))
        {
            var cursorId = DecodeCursor(cursor);
            var cursorRecord = await db.Records.AsNoTracking()
                .FirstOrDefaultAsync(r => r.Id == cursorId, ct);
            if (cursorRecord is not null)
            {
                query = query.Where(r =>
                    r.CreatedAt < cursorRecord.CreatedAt ||
                    (r.CreatedAt == cursorRecord.CreatedAt && r.Id.CompareTo(cursorRecord.Id) < 0));
            }
        }

        var items = await query
            .OrderByDescending(r => r.CreatedAt)
            .ThenByDescending(r => r.Id)
            .Take(limit + 1)
            .ToListAsync(ct);

        var hasMore = items.Count > limit;
        if (hasMore)
        {
            items = items.Take(limit).ToList();
        }

        var nextCursor = hasMore && items.Count > 0 ? EncodeCursor(items[^1].Id) : null;
        return (items.Select(r => r.ToDto()).ToList(), new PaginationMeta(nextCursor, hasMore));
    }

    public async Task<RecordDto> CreateAsync(
        Guid userId,
        Guid workspaceId,
        Guid collectionId,
        CreateRecordRequest request,
        CancellationToken ct = default)
    {
        await auth.RequireRoleAsync(workspaceId, userId, WorkspaceRole.Worker, ct);
        await EnsureCollectionAsync(workspaceId, collectionId, ct);

        var fields = await LoadFieldsAsync(collectionId, ct);
        var normalized = RecordDataValidator.ValidateAndNormalize(request.Data, fields);
        var now = DateTimeOffset.UtcNow;

        var record = new Record
        {
            Id = Guid.NewGuid(),
            WorkspaceId = workspaceId,
            CollectionId = collectionId,
            CreatedBy = userId,
            Data = RecordDataValidator.ToJsonDocument(normalized),
            CreatedAt = now,
            UpdatedAt = now,
        };

        db.Records.Add(record);
        await db.SaveChangesAsync(ct);
        return record.ToDto();
    }

    public async Task<RecordDto> GetAsync(
        Guid userId,
        Guid workspaceId,
        Guid collectionId,
        Guid recordId,
        CancellationToken ct = default)
    {
        await auth.RequireMembershipAsync(workspaceId, userId, ct);
        var record = await FindRecordAsync(workspaceId, collectionId, recordId, ct);
        return record.ToDto();
    }

    public async Task<RecordDto> UpdateAsync(
        Guid userId,
        Guid workspaceId,
        Guid collectionId,
        Guid recordId,
        UpdateRecordRequest request,
        CancellationToken ct = default)
    {
        await auth.RequireRoleAsync(workspaceId, userId, WorkspaceRole.Worker, ct);
        var record = await FindRecordAsync(workspaceId, collectionId, recordId, ct);

        if (record.CreatedBy != userId)
        {
            var role = await auth.GetRoleAsync(workspaceId, userId, ct);
            if (role is null or > WorkspaceRole.Manager)
            {
                throw new ServiceException("INSUFFICIENT_ROLE", "You can only edit your own entries.", 403);
            }
        }

        var fields = await LoadFieldsAsync(collectionId, ct);
        var normalized = RecordDataValidator.ValidateAndNormalize(request.Data, fields, isPartialUpdate: true);
        record.Data = RecordDataValidator.MergeData(record.Data, normalized);
        record.UpdatedAt = DateTimeOffset.UtcNow;
        await db.SaveChangesAsync(ct);
        return record.ToDto();
    }

    public async Task DeleteAsync(
        Guid userId,
        Guid workspaceId,
        Guid collectionId,
        Guid recordId,
        CancellationToken ct = default)
    {
        await auth.RequireRoleAsync(workspaceId, userId, WorkspaceRole.Worker, ct);
        var record = await FindRecordAsync(workspaceId, collectionId, recordId, ct);
        record.DeletedAt = DateTimeOffset.UtcNow;
        record.UpdatedAt = DateTimeOffset.UtcNow;
        await db.SaveChangesAsync(ct);
    }

    private async Task<List<Field>> LoadFieldsAsync(Guid collectionId, CancellationToken ct) =>
        await db.Fields.Where(f => f.CollectionId == collectionId && f.DeletedAt == null)
            .OrderBy(f => f.SortOrder)
            .ToListAsync(ct);

    private async Task EnsureCollectionAsync(Guid workspaceId, Guid collectionId, CancellationToken ct)
    {
        if (!await db.Collections.AnyAsync(
                c => c.Id == collectionId && c.WorkspaceId == workspaceId && c.DeletedAt == null, ct))
        {
            throw new ServiceException("COLLECTION_NOT_FOUND", "Collection not found.", 404);
        }
    }

    private async Task<Record> FindRecordAsync(Guid workspaceId, Guid collectionId, Guid recordId, CancellationToken ct)
    {
        var record = await db.Records.FirstOrDefaultAsync(
            r => r.Id == recordId && r.CollectionId == collectionId && r.WorkspaceId == workspaceId && r.DeletedAt == null,
            ct);

        if (record is null)
        {
            throw new ServiceException("RECORD_NOT_FOUND", "Entry not found.", 404);
        }

        return record;
    }

    private static string EncodeCursor(Guid id) => Convert.ToBase64String(Encoding.UTF8.GetBytes(id.ToString()));

    private static Guid DecodeCursor(string cursor)
    {
        try
        {
            var raw = Encoding.UTF8.GetString(Convert.FromBase64String(cursor));
            return Guid.Parse(raw);
        }
        catch
        {
            return Guid.Empty;
        }
    }
}
