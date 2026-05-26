using Tehtrak.Application.DTOs;

namespace Tehtrak.Application.Abstractions;

public interface ICollectionService
{
    Task<IReadOnlyList<CollectionDto>> ListAsync(Guid userId, Guid workspaceId, CancellationToken ct = default);
    Task<CollectionDto> CreateAsync(Guid userId, Guid workspaceId, CreateCollectionRequest request, CancellationToken ct = default);
    Task<CollectionDto> GetAsync(Guid userId, Guid workspaceId, Guid collectionId, CancellationToken ct = default);
    Task<CollectionDto> UpdateAsync(Guid userId, Guid workspaceId, Guid collectionId, UpdateCollectionRequest request, CancellationToken ct = default);
    Task DeleteAsync(Guid userId, Guid workspaceId, Guid collectionId, CancellationToken ct = default);
}
