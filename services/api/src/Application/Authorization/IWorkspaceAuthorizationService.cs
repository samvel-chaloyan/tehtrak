using Tehtrak.Domain.Enums;

namespace Tehtrak.Application.Authorization;

public interface IWorkspaceAuthorizationService
{
    Task<WorkspaceRole?> GetRoleAsync(Guid workspaceId, Guid userId, CancellationToken ct = default);
    Task RequireMembershipAsync(Guid workspaceId, Guid userId, CancellationToken ct = default);
    Task RequireRoleAsync(Guid workspaceId, Guid userId, WorkspaceRole minimumRole, CancellationToken ct = default);
}
