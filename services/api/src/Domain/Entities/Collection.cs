namespace Tehtrak.Domain.Entities;

public class Collection
{
    public Guid Id { get; set; }
    public Guid WorkspaceId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Icon { get; set; }
    public int SortOrder { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }

    public Workspace Workspace { get; set; } = null!;
    public ICollection<Field> Fields { get; set; } = [];
    public ICollection<Record> Records { get; set; } = [];
}
