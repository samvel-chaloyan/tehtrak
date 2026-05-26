using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tehtrak.Api.Extensions;
using Tehtrak.Application.Abstractions;
using Tehtrak.Application.Common;
using Tehtrak.Application.DTOs;

namespace Tehtrak.Api.Controllers;

[Authorize]
[ApiController]
[Route("v1/workspaces")]
public sealed class WorkspacesController(IWorkspaceService workspaces) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<WorkspaceDto>>>> List(CancellationToken ct)
    {
        var result = await workspaces.ListAsync(User.GetUserId(), ct);
        return Ok(ApiResponse<IReadOnlyList<WorkspaceDto>>.Ok(result));
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<WorkspaceDto>>> Create([FromBody] CreateWorkspaceRequest request, CancellationToken ct)
    {
        var result = await workspaces.CreateAsync(User.GetUserId(), request, ct);
        return Ok(ApiResponse<WorkspaceDto>.Ok(result));
    }

    [HttpGet("{workspaceId:guid}")]
    public async Task<ActionResult<ApiResponse<WorkspaceDto>>> Get(Guid workspaceId, CancellationToken ct)
    {
        var result = await workspaces.GetAsync(User.GetUserId(), workspaceId, ct);
        return Ok(ApiResponse<WorkspaceDto>.Ok(result));
    }

    [HttpPatch("{workspaceId:guid}")]
    public async Task<ActionResult<ApiResponse<WorkspaceDto>>> Update(Guid workspaceId, [FromBody] UpdateWorkspaceRequest request, CancellationToken ct)
    {
        var result = await workspaces.UpdateAsync(User.GetUserId(), workspaceId, request, ct);
        return Ok(ApiResponse<WorkspaceDto>.Ok(result));
    }

    [HttpDelete("{workspaceId:guid}")]
    public async Task<IActionResult> Delete(Guid workspaceId, CancellationToken ct)
    {
        await workspaces.DeleteAsync(User.GetUserId(), workspaceId, ct);
        return NoContent();
    }
}
