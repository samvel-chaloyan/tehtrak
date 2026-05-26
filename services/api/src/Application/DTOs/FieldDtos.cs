using System.Text.Json;

namespace Tehtrak.Application.DTOs;

public sealed record FieldDto(
    Guid Id,
    Guid CollectionId,
    string Key,
    string Label,
    string Type,
    bool Required,
    JsonElement Config,
    int SortOrder);

public sealed record CreateFieldRequest(
    string Key,
    string Label,
    string Type,
    bool Required,
    JsonElement? Config,
    int SortOrder);

public sealed record UpdateFieldRequest(
    string? Label,
    bool? Required,
    JsonElement? Config,
    int? SortOrder);

public sealed record ReorderFieldsRequest(IReadOnlyList<Guid> FieldIds);
