using System.Text.Json;
using Tehtrak.Application.DTOs;
using Tehtrak.Domain.Entities;
using Tehtrak.Domain.Enums;

namespace Tehtrak.Infrastructure.Mapping;

public static class EntityMappers
{
    public static UserDto ToDto(this User user) => new(user.Id, user.Email, user.DisplayName);

    public static WorkspaceDto ToDto(this Workspace workspace, WorkspaceRole role) =>
        new(
            workspace.Id,
            workspace.Name,
            workspace.Description,
            workspace.Slug,
            workspace.OwnerId,
            role.ToApiString(),
            workspace.CreatedAt,
            workspace.UpdatedAt);

    public static string ToApiString(this WorkspaceRole role) => role switch
    {
        WorkspaceRole.Owner => "owner",
        WorkspaceRole.Admin => "admin",
        WorkspaceRole.Manager => "manager",
        WorkspaceRole.Worker => "worker",
        WorkspaceRole.Viewer => "viewer",
        _ => "viewer",
    };

    public static CollectionDto ToDto(this Collection collection, int itemCount, DateTimeOffset? lastActivityAt) =>
        new(
            collection.Id,
            collection.WorkspaceId,
            collection.Name,
            collection.Description,
            collection.Icon,
            collection.SortOrder,
            itemCount,
            lastActivityAt,
            collection.CreatedAt,
            collection.UpdatedAt);

    public static FieldDto ToDto(this Field field) =>
        new(
            field.Id,
            field.CollectionId,
            field.Key,
            field.Label,
            field.Type.ToApiString(),
            field.Required,
            field.Config.RootElement.Clone(),
            field.SortOrder);

    public static RecordDto ToDto(this Record record) =>
        new(
            record.Id,
            record.CollectionId,
            record.WorkspaceId,
            record.CreatedBy,
            record.Data.RootElement.Clone(),
            record.CreatedAt,
            record.UpdatedAt);

    public static string ToApiString(this FieldType type) => type switch
    {
        FieldType.Text => "text",
        FieldType.Number => "number",
        FieldType.Date => "date",
        FieldType.Boolean => "boolean",
        FieldType.Select => "select",
        _ => "text",
    };

    public static FieldType ParseFieldType(string type) => type.ToLowerInvariant() switch
    {
        "text" => FieldType.Text,
        "number" => FieldType.Number,
        "date" => FieldType.Date,
        "boolean" => FieldType.Boolean,
        "select" => FieldType.Select,
        _ => throw new Application.Common.ServiceException("VALIDATION_ERROR", $"Invalid field type: {type}", 400),
    };

    public static JsonDocument ParseConfig(JsonElement? config)
    {
        if (config is null || config.Value.ValueKind == JsonValueKind.Undefined || config.Value.ValueKind == JsonValueKind.Null)
        {
            return JsonDocument.Parse("{}");
        }

        return JsonDocument.Parse(config.Value.GetRawText());
    }
}
