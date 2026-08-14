using Microsoft.EntityFrameworkCore;
using Tehtrak.Domain.Entities;

namespace Tehtrak.Infrastructure.Persistence;

public class TehtrakDbContext(DbContextOptions<TehtrakDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<Workspace> Workspaces => Set<Workspace>();
    public DbSet<WorkspaceMember> WorkspaceMembers => Set<WorkspaceMember>();
    public DbSet<Collection> Collections => Set<Collection>();
    public DbSet<Field> Fields => Set<Field>();
    public DbSet<Record> Records => Set<Record>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(e =>
        {
            e.ToTable("users");
            e.HasKey(x => x.Id);
            e.Property(x => x.Email).HasMaxLength(255).IsRequired();
            e.HasIndex(x => x.Email).IsUnique();
            e.Property(x => x.DisplayName).HasMaxLength(100).IsRequired();
        });

        modelBuilder.Entity<RefreshToken>(e =>
        {
            e.ToTable("refresh_tokens");
            e.HasKey(x => x.Id);
            e.HasIndex(x => x.TokenHash);
            e.HasOne(x => x.User).WithMany(u => u.RefreshTokens).HasForeignKey(x => x.UserId);
        });

        modelBuilder.Entity<Workspace>(e =>
        {
            e.ToTable("workspaces");
            e.HasKey(x => x.Id);
            e.Property(x => x.Name).HasMaxLength(100).IsRequired();
            e.Property(x => x.Slug).HasMaxLength(100).IsRequired();
            e.HasIndex(x => x.Slug).IsUnique();
            e.HasOne(x => x.Owner).WithMany().HasForeignKey(x => x.OwnerId);
        });

        modelBuilder.Entity<WorkspaceMember>(e =>
        {
            e.ToTable("workspace_members");
            e.HasKey(x => x.Id);
            e.HasIndex(x => new { x.WorkspaceId, x.UserId }).IsUnique();
            e.Property(x => x.Role).HasConversion<string>().HasMaxLength(20);
        });

        modelBuilder.Entity<Collection>(e =>
        {
            e.ToTable("collections");
            e.HasKey(x => x.Id);
            e.Property(x => x.Name).HasMaxLength(100).IsRequired();
            e.HasIndex(x => new { x.WorkspaceId, x.Name })
                .IsUnique()
                .HasFilter("\"deleted_at\" IS NULL");
        });

        modelBuilder.Entity<Field>(e =>
        {
            e.ToTable("fields");
            e.HasKey(x => x.Id);
            e.Property(x => x.Key).HasMaxLength(64).IsRequired();
            e.Property(x => x.Label).HasMaxLength(100).IsRequired();
            e.Property(x => x.Type).HasConversion<string>().HasMaxLength(20);
            e.Property(x => x.Config).HasColumnType("jsonb");
            e.HasIndex(x => new { x.CollectionId, x.Key })
                .IsUnique()
                .HasFilter("\"deleted_at\" IS NULL");
        });

        modelBuilder.Entity<Record>(e =>
        {
            e.ToTable("records");
            e.HasKey(x => x.Id);
            e.Property(x => x.Data).HasColumnType("jsonb");
            e.HasIndex(x => new { x.CollectionId, x.CreatedAt });
            // Property is CreatedBy; navigation is Creator — tell EF they are the same FK.
            e.HasOne(x => x.Creator)
                .WithMany()
                .HasForeignKey(x => x.CreatedBy);
        });
    }
}
