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

public sealed class WorkspaceService(
    TehtrakDbContext db,
    IWorkspaceAuthorizationService auth) : IWorkspaceService
{
    public async Task<IReadOnlyList<WorkspaceDto>> ListAsync(Guid userId, CancellationToken ct = default)
    {
        var rows = await (
            from m in db.WorkspaceMembers.AsNoTracking()
            where m.UserId == userId
            join w in db.Workspaces.Where(w => w.DeletedAt == null) on m.WorkspaceId equals w.Id
            orderby w.Name
            select new { Workspace = w, m.Role }
        ).ToListAsync(ct);

        return rows.Select(row => row.Workspace.ToDto(row.Role)).ToList();
    }

    public async Task<WorkspaceDto> CreateAsync(Guid userId, CreateWorkspaceRequest request, CancellationToken ct = default)
    {
        var name = request.Name.Trim();
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ServiceException("VALIDATION_ERROR", "Workspace name is required.", 400);
        }

        var slug = SlugHelper.FromName(name);
        if (await db.Workspaces.AnyAsync(w => w.Slug == slug && w.DeletedAt == null, ct))
        {
            slug = $"{slug}-{Guid.NewGuid().ToString()[..8]}";
        }

        var now = DateTimeOffset.UtcNow;
        var workspace = new Workspace
        {
            Id = Guid.NewGuid(),
            Name = name,
            Description = NormalizeDescription(request.Description),
            Slug = slug,
            OwnerId = userId,
            CreatedAt = now,
            UpdatedAt = now,
        };

        db.Workspaces.Add(workspace);
        db.WorkspaceMembers.Add(new WorkspaceMember
        {
            Id = Guid.NewGuid(),
            WorkspaceId = workspace.Id,
            UserId = userId,
            Role = WorkspaceRole.Owner,
            JoinedAt = now,
        });

        await db.SaveChangesAsync(ct);
        return workspace.ToDto(WorkspaceRole.Owner);
    }

    public async Task<WorkspaceDto> GetAsync(Guid userId, Guid workspaceId, CancellationToken ct = default)
    {
        await auth.RequireMembershipAsync(workspaceId, userId, ct);
        var role = await auth.GetRoleAsync(workspaceId, userId, ct)
            ?? throw new ServiceException("WORKSPACE_ACCESS_DENIED", "You are not a member of this workspace.", 403);
        var workspace = await FindWorkspaceAsync(workspaceId, ct);
        return workspace.ToDto(role);
    }

    public async Task<WorkspaceDto> UpdateAsync(Guid userId, Guid workspaceId, UpdateWorkspaceRequest request, CancellationToken ct = default)
    {
        await auth.RequireRoleAsync(workspaceId, userId, WorkspaceRole.Admin, ct);
        var workspace = await FindWorkspaceAsync(workspaceId, ct);

        if (request.Name is not null)
        {
            var name = request.Name.Trim();
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ServiceException("VALIDATION_ERROR", "Workspace name is required.", 400);
            }

            workspace.Name = name;
        }

        if (request.Description is not null)
        {
            workspace.Description = NormalizeDescription(request.Description);
        }

        workspace.UpdatedAt = DateTimeOffset.UtcNow;
        await db.SaveChangesAsync(ct);
        var role = await auth.GetRoleAsync(workspaceId, userId, ct) ?? WorkspaceRole.Admin;
        return workspace.ToDto(role);
    }

    public async Task DeleteAsync(Guid userId, Guid workspaceId, CancellationToken ct = default)
    {
        await auth.RequireRoleAsync(workspaceId, userId, WorkspaceRole.Owner, ct);
        var workspace = await FindWorkspaceAsync(workspaceId, ct);
        workspace.DeletedAt = DateTimeOffset.UtcNow;
        workspace.UpdatedAt = DateTimeOffset.UtcNow;
        await db.SaveChangesAsync(ct);
    }

    private static string? NormalizeDescription(string? description) =>
        string.IsNullOrWhiteSpace(description) ? null : description.Trim();

    private async Task<Workspace> FindWorkspaceAsync(Guid workspaceId, CancellationToken ct)
    {
        var workspace = await db.Workspaces.FirstOrDefaultAsync(w => w.Id == workspaceId && w.DeletedAt == null, ct);
        if (workspace is null)
        {
            throw new ServiceException("NOT_FOUND", "Workspace not found.", 404);
        }

        return workspace;
    }
}
