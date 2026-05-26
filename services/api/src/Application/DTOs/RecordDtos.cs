using System.Text.Json;

namespace Tehtrak.Application.DTOs;

public sealed record RecordDto(
    Guid Id,
    Guid CollectionId,
    Guid WorkspaceId,
    Guid CreatedBy,
    JsonElement Data,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt);

public sealed record CreateRecordRequest(JsonElement Data);

public sealed record UpdateRecordRequest(JsonElement Data);

public sealed record PaginationMeta(string? Cursor, bool HasMore, int? Total = null);
