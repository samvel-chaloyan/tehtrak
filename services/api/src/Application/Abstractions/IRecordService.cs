using Tehtrak.Application.DTOs;

namespace Tehtrak.Application.Abstractions;

public interface IRecordService
{
    Task<(IReadOnlyList<RecordDto> Items, PaginationMeta Meta)> ListAsync(
        Guid userId,
        Guid workspaceId,
        Guid collectionId,
        string? cursor,
        int limit,
        string? search,
        CancellationToken ct = default);

    Task<RecordDto> CreateAsync(Guid userId, Guid workspaceId, Guid collectionId, CreateRecordRequest request, CancellationToken ct = default);
    Task<RecordDto> GetAsync(Guid userId, Guid workspaceId, Guid collectionId, Guid recordId, CancellationToken ct = default);
    Task<RecordDto> UpdateAsync(Guid userId, Guid workspaceId, Guid collectionId, Guid recordId, UpdateRecordRequest request, CancellationToken ct = default);
    Task DeleteAsync(Guid userId, Guid workspaceId, Guid collectionId, Guid recordId, CancellationToken ct = default);
}
