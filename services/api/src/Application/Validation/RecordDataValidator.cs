using System.Text.Json;
using Tehtrak.Application.Common;
using Tehtrak.Domain.Entities;
using Tehtrak.Domain.Enums;

namespace Tehtrak.Application.Validation;

public static class RecordDataValidator
{
    public static Dictionary<string, object?> ValidateAndNormalize(
        JsonElement data,
        IReadOnlyList<Field> fields,
        bool isPartialUpdate = false)
    {
        var result = new Dictionary<string, object?>();
        var fieldMap = fields.Where(f => f.DeletedAt == null).ToDictionary(f => f.Key, f => f);

        if (data.ValueKind != JsonValueKind.Object)
        {
            throw new ServiceException("VALIDATION_ERROR", "Record data must be an object.", 400);
        }

        foreach (var field in fieldMap.Values)
        {
            var hasKey = data.TryGetProperty(field.Key, out var value);

            if (!hasKey)
            {
                if (field.Required && !isPartialUpdate)
                {
                    throw new ServiceException(
                        "VALIDATION_ERROR",
                        "Validation failed",
                        400,
                        new Dictionary<string, string[]> { [field.Key] = [$"{field.Label} is required"] });
                }
                continue;
            }

            if (value.ValueKind == JsonValueKind.Null)
            {
                if (field.Required)
                {
                    throw new ServiceException(
                        "VALIDATION_ERROR",
                        "Validation failed",
                        400,
                        new Dictionary<string, string[]> { [field.Key] = [$"{field.Label} is required"] });
                }
                result[field.Key] = null;
                continue;
            }

            result[field.Key] = ParseValue(field, value);
        }

        foreach (var prop in data.EnumerateObject())
        {
            if (!fieldMap.ContainsKey(prop.Name))
            {
                throw new ServiceException(
                    "VALIDATION_ERROR",
                    $"Unknown property '{prop.Name}'.",
                    400);
            }
        }

        return result;
    }

    private static object? ParseValue(Field field, JsonElement value)
    {
        return field.Type switch
        {
            FieldType.Text => ParseText(field, value),
            FieldType.Number => ParseNumber(field, value),
            FieldType.Date => ParseDate(field, value),
            FieldType.Boolean => ParseBoolean(field, value),
            FieldType.Select => ParseSelect(field, value),
            _ => throw new ServiceException("VALIDATION_ERROR", $"Unsupported field type: {field.Type}", 400),
        };
    }

    private static string ParseText(Field field, JsonElement value)
    {
        if (value.ValueKind != JsonValueKind.String)
        {
            throw FieldError(field, "must be text");
        }

        var text = value.GetString() ?? string.Empty;
        var maxLength = GetConfigInt(field, "maxLength") ?? 500;
        if (text.Length > maxLength)
        {
            throw FieldError(field, $"must be at most {maxLength} characters");
        }

        return text;
    }

    private static double ParseNumber(Field field, JsonElement value)
    {
        if (value.ValueKind != JsonValueKind.Number)
        {
            throw FieldError(field, "must be a number");
        }

        var number = value.GetDouble();
        var min = GetConfigDouble(field, "min");
        var max = GetConfigDouble(field, "max");
        if (min.HasValue && number < min) throw FieldError(field, $"must be at least {min}");
        if (max.HasValue && number > max) throw FieldError(field, $"must be at most {max}");
        return number;
    }

    private static string ParseDate(Field field, JsonElement value)
    {
        if (value.ValueKind != JsonValueKind.String)
        {
            throw FieldError(field, "must be an ISO date string");
        }

        var text = value.GetString() ?? string.Empty;
        if (!DateTimeOffset.TryParse(text, out _))
        {
            throw FieldError(field, "must be a valid date");
        }

        return text;
    }

    private static bool ParseBoolean(Field field, JsonElement value)
    {
        if (value.ValueKind is not (JsonValueKind.True or JsonValueKind.False))
        {
            throw FieldError(field, "must be true or false");
        }

        return value.GetBoolean();
    }

    private static string ParseSelect(Field field, JsonElement value)
    {
        if (value.ValueKind != JsonValueKind.String)
        {
            throw FieldError(field, "must be a choice value");
        }

        var selected = value.GetString() ?? string.Empty;
        var options = GetSelectValues(field);
        if (options.Count > 0 && !options.Contains(selected))
        {
            throw FieldError(field, "must be a valid option");
        }

        return selected;
    }

    private static HashSet<string> GetSelectValues(Field field)
    {
        var set = new HashSet<string>(StringComparer.Ordinal);
        if (!field.Config.RootElement.TryGetProperty("options", out var options) ||
            options.ValueKind != JsonValueKind.Array)
        {
            return set;
        }

        foreach (var option in options.EnumerateArray())
        {
            if (option.TryGetProperty("value", out var val) && val.ValueKind == JsonValueKind.String)
            {
                set.Add(val.GetString() ?? string.Empty);
            }
        }

        return set;
    }

    private static int? GetConfigInt(Field field, string key)
    {
        if (field.Config.RootElement.TryGetProperty(key, out var el) && el.ValueKind == JsonValueKind.Number)
        {
            return el.GetInt32();
        }
        return null;
    }

    private static double? GetConfigDouble(Field field, string key)
    {
        if (field.Config.RootElement.TryGetProperty(key, out var el) && el.ValueKind == JsonValueKind.Number)
        {
            return el.GetDouble();
        }
        return null;
    }

    private static ServiceException FieldError(Field field, string message) =>
        new("VALIDATION_ERROR", "Validation failed", 400,
            new Dictionary<string, string[]> { [field.Key] = [$"{field.Label} {message}"] });

    public static JsonDocument ToJsonDocument(Dictionary<string, object?> data)
    {
        var json = JsonSerializer.Serialize(data);
        return JsonDocument.Parse(json);
    }

    public static JsonDocument MergeData(JsonDocument existing, Dictionary<string, object?> patch)
    {
        var dict = JsonSerializer.Deserialize<Dictionary<string, object?>>(existing.RootElement.GetRawText())
                   ?? new Dictionary<string, object?>();
        foreach (var (key, val) in patch)
        {
            dict[key] = val;
        }
        return ToJsonDocument(dict);
    }
}
