using Tehtrak.Application.DTOs;

namespace Tehtrak.Application.Abstractions;

public interface IFieldService
{
    Task<IReadOnlyList<FieldDto>> ListAsync(Guid userId, Guid workspaceId, Guid collectionId, CancellationToken ct = default);
    Task<FieldDto> CreateAsync(Guid userId, Guid workspaceId, Guid collectionId, CreateFieldRequest request, CancellationToken ct = default);
    Task<FieldDto> UpdateAsync(Guid userId, Guid workspaceId, Guid collectionId, Guid fieldId, UpdateFieldRequest request, CancellationToken ct = default);
    Task DeleteAsync(Guid userId, Guid workspaceId, Guid collectionId, Guid fieldId, CancellationToken ct = default);
    Task ReorderAsync(Guid userId, Guid workspaceId, Guid collectionId, ReorderFieldsRequest request, CancellationToken ct = default);
}
