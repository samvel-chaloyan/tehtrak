using Tehtrak.Application.DTOs;

namespace Tehtrak.Application.Abstractions;

public interface IWorkspaceService
{
    Task<IReadOnlyList<WorkspaceDto>> ListAsync(Guid userId, CancellationToken ct = default);
    Task<WorkspaceDto> CreateAsync(Guid userId, CreateWorkspaceRequest request, CancellationToken ct = default);
    Task<WorkspaceDto> GetAsync(Guid userId, Guid workspaceId, CancellationToken ct = default);
    Task<WorkspaceDto> UpdateAsync(Guid userId, Guid workspaceId, UpdateWorkspaceRequest request, CancellationToken ct = default);
    Task DeleteAsync(Guid userId, Guid workspaceId, CancellationToken ct = default);
}
