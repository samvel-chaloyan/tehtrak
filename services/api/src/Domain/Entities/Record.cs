using System.Text.Json;

namespace Tehtrak.Domain.Entities;

public class Record
{
    public Guid Id { get; set; }
    public Guid WorkspaceId { get; set; }
    public Guid CollectionId { get; set; }
    public Guid CreatedBy { get; set; }
    public JsonDocument Data { get; set; } = JsonDocument.Parse("{}");
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }

    public Workspace Workspace { get; set; } = null!;
    public Collection Collection { get; set; } = null!;
    public User Creator { get; set; } = null!;
}
