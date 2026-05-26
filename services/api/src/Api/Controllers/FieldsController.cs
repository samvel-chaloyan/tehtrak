using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tehtrak.Api.Extensions;
using Tehtrak.Application.Abstractions;
using Tehtrak.Application.Common;
using Tehtrak.Application.DTOs;

namespace Tehtrak.Api.Controllers;

[Authorize]
[ApiController]
[Route("v1/workspaces/{workspaceId:guid}/collections/{collectionId:guid}/fields")]
public sealed class FieldsController(IFieldService fields) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<FieldDto>>>> List(
        Guid workspaceId,
        Guid collectionId,
        CancellationToken ct)
    {
        var result = await fields.ListAsync(User.GetUserId(), workspaceId, collectionId, ct);
        return Ok(ApiResponse<IReadOnlyList<FieldDto>>.Ok(result));
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<FieldDto>>> Create(
        Guid workspaceId,
        Guid collectionId,
        [FromBody] CreateFieldRequest request,
        CancellationToken ct)
    {
        var result = await fields.CreateAsync(User.GetUserId(), workspaceId, collectionId, request, ct);
        return Ok(ApiResponse<FieldDto>.Ok(result));
    }

    [HttpPatch("{fieldId:guid}")]
    public async Task<ActionResult<ApiResponse<FieldDto>>> Update(
        Guid workspaceId,
        Guid collectionId,
        Guid fieldId,
        [FromBody] UpdateFieldRequest request,
        CancellationToken ct)
    {
        var result = await fields.UpdateAsync(User.GetUserId(), workspaceId, collectionId, fieldId, request, ct);
        return Ok(ApiResponse<FieldDto>.Ok(result));
    }

    [HttpDelete("{fieldId:guid}")]
    public async Task<IActionResult> Delete(Guid workspaceId, Guid collectionId, Guid fieldId, CancellationToken ct)
    {
        await fields.DeleteAsync(User.GetUserId(), workspaceId, collectionId, fieldId, ct);
        return NoContent();
    }

    [HttpPut("reorder")]
    public async Task<IActionResult> Reorder(
        Guid workspaceId,
        Guid collectionId,
        [FromBody] ReorderFieldsRequest request,
        CancellationToken ct)
    {
        await fields.ReorderAsync(User.GetUserId(), workspaceId, collectionId, request, ct);
        return NoContent();
    }
}
