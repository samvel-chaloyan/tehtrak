namespace Tehtrak.Application.DTOs;

public sealed record CollectionDto(
    Guid Id,
    Guid WorkspaceId,
    string Name,
    string? Description,
    string? Icon,
    int SortOrder,
    int ItemCount,
    DateTimeOffset? LastActivityAt,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt);

public sealed record CreateCollectionRequest(string Name, string? Description, string? Icon);

public sealed record UpdateCollectionRequest(string? Name, string? Description, string? Icon);
