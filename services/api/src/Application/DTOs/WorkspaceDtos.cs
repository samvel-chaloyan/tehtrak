namespace Tehtrak.Application.DTOs;

public sealed record WorkspaceDto(
    Guid Id,
    string Name,
    string? Description,
    string Slug,
    Guid OwnerId,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt);

public sealed record CreateWorkspaceRequest(string Name, string? Description);

public sealed record UpdateWorkspaceRequest(string? Name, string? Description);
