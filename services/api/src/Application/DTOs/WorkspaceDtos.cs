namespace Tehtrak.Application.DTOs;

public sealed record WorkspaceDto(
    Guid Id,
    string Name,
    string Slug,
    Guid OwnerId,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt);

public sealed record CreateWorkspaceRequest(string Name);

public sealed record UpdateWorkspaceRequest(string Name);
