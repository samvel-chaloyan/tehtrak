using System.Text.Json;
using Tehtrak.Domain.Enums;

namespace Tehtrak.Domain.Entities;

public class Field
{
    public Guid Id { get; set; }
    public Guid CollectionId { get; set; }
    public string Key { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public FieldType Type { get; set; }
    public JsonDocument Config { get; set; } = JsonDocument.Parse("{}");
    public bool Required { get; set; }
    public int SortOrder { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }

    public Collection Collection { get; set; } = null!;
}
