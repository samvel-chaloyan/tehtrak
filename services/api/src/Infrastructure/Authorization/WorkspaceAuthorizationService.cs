using Microsoft.EntityFrameworkCore;
using Tehtrak.Application.Authorization;
using Tehtrak.Application.Common;
using Tehtrak.Domain.Enums;
using Tehtrak.Infrastructure.Persistence;

namespace Tehtrak.Infrastructure.Authorization;

public sealed class WorkspaceAuthorizationService(TehtrakDbContext db) : IWorkspaceAuthorizationService
{
    public async Task<WorkspaceRole?> GetRoleAsync(Guid workspaceId, Guid userId, CancellationToken ct = default)
    {
        var member = await db.WorkspaceMembers
            .AsNoTracking()
            .FirstOrDefaultAsync(m => m.WorkspaceId == workspaceId && m.UserId == userId, ct);

        return member?.Role;
    }

    public async Task RequireMembershipAsync(Guid workspaceId, Guid userId, CancellationToken ct = default)
    {
        var role = await GetRoleAsync(workspaceId, userId, ct);
        if (role is null)
        {
            throw new ServiceException("WORKSPACE_ACCESS_DENIED", "You do not have access to this workspace.", 403);
        }
    }

    public async Task RequireRoleAsync(Guid workspaceId, Guid userId, WorkspaceRole minimumRole, CancellationToken ct = default)
    {
        var role = await GetRoleAsync(workspaceId, userId, ct);
        if (role is null)
        {
            throw new ServiceException("WORKSPACE_ACCESS_DENIED", "You do not have access to this workspace.", 403);
        }

        if (role.Value > minimumRole)
        {
            throw new ServiceException("INSUFFICIENT_ROLE", "You do not have permission for this action.", 403);
        }
    }
}
