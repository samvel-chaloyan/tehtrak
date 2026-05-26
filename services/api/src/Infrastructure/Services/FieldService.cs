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

public sealed class FieldService(
    TehtrakDbContext db,
    IWorkspaceAuthorizationService auth) : IFieldService
{
    public async Task<IReadOnlyList<FieldDto>> ListAsync(
        Guid userId,
        Guid workspaceId,
        Guid collectionId,
        CancellationToken ct = default)
    {
        await auth.RequireMembershipAsync(workspaceId, userId, ct);
        await EnsureCollectionAsync(workspaceId, collectionId, ct);

        return await db.Fields
            .AsNoTracking()
            .Where(f => f.CollectionId == collectionId && f.DeletedAt == null)
            .OrderBy(f => f.SortOrder)
            .Select(f => f.ToDto())
            .ToListAsync(ct);
    }

    public async Task<FieldDto> CreateAsync(
        Guid userId,
        Guid workspaceId,
        Guid collectionId,
        CreateFieldRequest request,
        CancellationToken ct = default)
    {
        await auth.RequireRoleAsync(workspaceId, userId, WorkspaceRole.Manager, ct);
        await EnsureCollectionAsync(workspaceId, collectionId, ct);

        var key = request.Key.Trim().ToLowerInvariant();
        if (string.IsNullOrWhiteSpace(key) || string.IsNullOrWhiteSpace(request.Label))
        {
            throw new ServiceException("VALIDATION_ERROR", "Property key and label are required.", 400);
        }

        if (await db.Fields.AnyAsync(f => f.CollectionId == collectionId && f.Key == key && f.DeletedAt == null, ct))
        {
            throw new ServiceException("CONFLICT", "A property with this key already exists.", 409);
        }

        var now = DateTimeOffset.UtcNow;
        var field = new Field
        {
            Id = Guid.NewGuid(),
            CollectionId = collectionId,
            Key = key,
            Label = request.Label.Trim(),
            Type = EntityMappers.ParseFieldType(request.Type),
            Required = request.Required,
            Config = EntityMappers.ParseConfig(request.Config),
            SortOrder = request.SortOrder,
            CreatedAt = now,
            UpdatedAt = now,
        };

        db.Fields.Add(field);
        await db.SaveChangesAsync(ct);
        return field.ToDto();
    }

    public async Task<FieldDto> UpdateAsync(
        Guid userId,
        Guid workspaceId,
        Guid collectionId,
        Guid fieldId,
        UpdateFieldRequest request,
        CancellationToken ct = default)
    {
        await auth.RequireRoleAsync(workspaceId, userId, WorkspaceRole.Manager, ct);
        var field = await FindFieldAsync(workspaceId, collectionId, fieldId, ct);

        if (request.Label is not null) field.Label = request.Label.Trim();
        if (request.Required.HasValue) field.Required = request.Required.Value;
        if (request.Config.HasValue) field.Config = EntityMappers.ParseConfig(request.Config);
        if (request.SortOrder.HasValue) field.SortOrder = request.SortOrder.Value;
        field.UpdatedAt = DateTimeOffset.UtcNow;

        await db.SaveChangesAsync(ct);
        return field.ToDto();
    }

    public async Task DeleteAsync(
        Guid userId,
        Guid workspaceId,
        Guid collectionId,
        Guid fieldId,
        CancellationToken ct = default)
    {
        await auth.RequireRoleAsync(workspaceId, userId, WorkspaceRole.Manager, ct);
        var field = await FindFieldAsync(workspaceId, collectionId, fieldId, ct);
        field.DeletedAt = DateTimeOffset.UtcNow;
        field.UpdatedAt = DateTimeOffset.UtcNow;
        await db.SaveChangesAsync(ct);
    }

    public async Task ReorderAsync(
        Guid userId,
        Guid workspaceId,
        Guid collectionId,
        ReorderFieldsRequest request,
        CancellationToken ct = default)
    {
        await auth.RequireRoleAsync(workspaceId, userId, WorkspaceRole.Manager, ct);
        await EnsureCollectionAsync(workspaceId, collectionId, ct);

        var fields = await db.Fields
            .Where(f => f.CollectionId == collectionId && f.DeletedAt == null)
            .ToListAsync(ct);

        for (var i = 0; i < request.FieldIds.Count; i++)
        {
            var field = fields.FirstOrDefault(f => f.Id == request.FieldIds[i]);
            if (field is not null)
            {
                field.SortOrder = i;
                field.UpdatedAt = DateTimeOffset.UtcNow;
            }
        }

        await db.SaveChangesAsync(ct);
    }

    private async Task EnsureCollectionAsync(Guid workspaceId, Guid collectionId, CancellationToken ct)
    {
        if (!await db.Collections.AnyAsync(
                c => c.Id == collectionId && c.WorkspaceId == workspaceId && c.DeletedAt == null, ct))
        {
            throw new ServiceException("COLLECTION_NOT_FOUND", "Collection not found.", 404);
        }
    }

    private async Task<Field> FindFieldAsync(Guid workspaceId, Guid collectionId, Guid fieldId, CancellationToken ct)
    {
        await EnsureCollectionAsync(workspaceId, collectionId, ct);
        var field = await db.Fields.FirstOrDefaultAsync(
            f => f.Id == fieldId && f.CollectionId == collectionId && f.DeletedAt == null, ct);

        if (field is null)
        {
            throw new ServiceException("NOT_FOUND", "Property not found.", 404);
        }

        return field;
    }
}
