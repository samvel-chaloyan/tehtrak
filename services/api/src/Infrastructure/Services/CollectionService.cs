using Microsoft.EntityFrameworkCore;
using Tehtrak.Application.Abstractions;
using Tehtrak.Application.Authorization;
using Tehtrak.Application.Common;
using Tehtrak.Application.DTOs;
using Tehtrak.Domain.Entities;
using Tehtrak.Domain.Enums;
using Tehtrak.Infrastructure.Mapping;
using Tehtrak.Infrastructure.Persistence;

namespace Tehtrak.Infrastructure.Services;

public sealed class CollectionService(
    TehtrakDbContext db,
    IWorkspaceAuthorizationService auth) : ICollectionService
{
    public async Task<IReadOnlyList<CollectionDto>> ListAsync(Guid userId, Guid workspaceId, CancellationToken ct = default)
    {
        await auth.RequireMembershipAsync(workspaceId, userId, ct);

        var collections = await db.Collections
            .AsNoTracking()
            .Where(c => c.WorkspaceId == workspaceId && c.DeletedAt == null)
            .OrderBy(c => c.SortOrder)
            .ThenBy(c => c.Name)
            .ToListAsync(ct);

        var ids = collections.Select(c => c.Id).ToList();
        var stats = await db.Records
            .AsNoTracking()
            .Where(r => ids.Contains(r.CollectionId) && r.DeletedAt == null)
            .GroupBy(r => r.CollectionId)
            .Select(g => new { CollectionId = g.Key, Count = g.Count(), Last = g.Max(r => r.UpdatedAt) })
            .ToDictionaryAsync(x => x.CollectionId, ct);

        return collections
            .Select(c =>
            {
                stats.TryGetValue(c.Id, out var s);
                return c.ToDto(s?.Count ?? 0, s?.Last);
            })
            .ToList();
    }

    public async Task<CollectionDto> CreateAsync(
        Guid userId,
        Guid workspaceId,
        CreateCollectionRequest request,
        CancellationToken ct = default)
    {
        await auth.RequireRoleAsync(workspaceId, userId, WorkspaceRole.Manager, ct);

        var name = request.Name.Trim();
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ServiceException("VALIDATION_ERROR", "Collection name is required.", 400);
        }

        if (await db.Collections.AnyAsync(
                c => c.WorkspaceId == workspaceId && c.Name == name && c.DeletedAt == null, ct))
        {
            throw new ServiceException("CONFLICT", "A collection with this name already exists.", 409);
        }

        var now = DateTimeOffset.UtcNow;
        var maxOrder = await db.Collections
            .Where(c => c.WorkspaceId == workspaceId && c.DeletedAt == null)
            .MaxAsync(c => (int?)c.SortOrder, ct) ?? -1;

        var collection = new Collection
        {
            Id = Guid.NewGuid(),
            WorkspaceId = workspaceId,
            Name = name,
            Description = request.Description?.Trim(),
            Icon = request.Icon?.Trim(),
            SortOrder = maxOrder + 1,
            CreatedAt = now,
            UpdatedAt = now,
        };

        db.Collections.Add(collection);
        await db.SaveChangesAsync(ct);
        return collection.ToDto(0, null);
    }

    public async Task<CollectionDto> GetAsync(Guid userId, Guid workspaceId, Guid collectionId, CancellationToken ct = default)
    {
        await auth.RequireMembershipAsync(workspaceId, userId, ct);
        var collection = await FindCollectionAsync(workspaceId, collectionId, ct);
        var (count, last) = await GetStatsAsync(collectionId, ct);
        return collection.ToDto(count, last);
    }

    public async Task<CollectionDto> UpdateAsync(
        Guid userId,
        Guid workspaceId,
        Guid collectionId,
        UpdateCollectionRequest request,
        CancellationToken ct = default)
    {
        await auth.RequireRoleAsync(workspaceId, userId, WorkspaceRole.Manager, ct);
        var collection = await FindCollectionAsync(workspaceId, collectionId, ct);

        if (request.Name is not null)
        {
            collection.Name = request.Name.Trim();
        }

        if (request.Description is not null)
        {
            collection.Description = request.Description.Trim();
        }

        if (request.Icon is not null)
        {
            collection.Icon = request.Icon.Trim();
        }

        collection.UpdatedAt = DateTimeOffset.UtcNow;
        await db.SaveChangesAsync(ct);
        var (count, last) = await GetStatsAsync(collectionId, ct);
        return collection.ToDto(count, last);
    }

    public async Task DeleteAsync(Guid userId, Guid workspaceId, Guid collectionId, CancellationToken ct = default)
    {
        await auth.RequireRoleAsync(workspaceId, userId, WorkspaceRole.Manager, ct);
        var collection = await FindCollectionAsync(workspaceId, collectionId, ct);
        collection.DeletedAt = DateTimeOffset.UtcNow;
        collection.UpdatedAt = DateTimeOffset.UtcNow;
        await db.SaveChangesAsync(ct);
    }

    private async Task<Collection> FindCollectionAsync(Guid workspaceId, Guid collectionId, CancellationToken ct)
    {
        var collection = await db.Collections.FirstOrDefaultAsync(
            c => c.Id == collectionId && c.WorkspaceId == workspaceId && c.DeletedAt == null, ct);

        if (collection is null)
        {
            throw new ServiceException("COLLECTION_NOT_FOUND", "Collection not found.", 404);
        }

        return collection;
    }

    private async Task<(int Count, DateTimeOffset? Last)> GetStatsAsync(Guid collectionId, CancellationToken ct)
    {
        var query = db.Records.AsNoTracking().Where(r => r.CollectionId == collectionId && r.DeletedAt == null);
        var count = await query.CountAsync(ct);
        DateTimeOffset? last = count > 0 ? await query.MaxAsync(r => r.UpdatedAt, ct) : null;
        return (count, last);
    }
}
