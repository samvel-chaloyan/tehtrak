using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tehtrak.Infrastructure.Persistence.Migrations;

[DbContext(typeof(TehtrakDbContext))]
[Migration("20260815202100_AddWorkspaceDescription")]
public partial class AddWorkspaceDescription : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<string>(
            name: "description",
            table: "workspaces",
            type: "text",
            nullable: true);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            name: "description",
            table: "workspaces");
    }
}
