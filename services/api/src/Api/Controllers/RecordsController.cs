using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tehtrak.Api.Extensions;
using Tehtrak.Application.Abstractions;
using Tehtrak.Application.Common;
using Tehtrak.Application.DTOs;

namespace Tehtrak.Api.Controllers;

[Authorize]
[ApiController]
[Route("v1/workspaces/{workspaceId:guid}/collections/{collectionId:guid}/records")]
public sealed class RecordsController(IRecordService records) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<RecordDto>>>> List(
        Guid workspaceId,
        Guid collectionId,
        [FromQuery] string? cursor,
        [FromQuery] int limit = 50,
        [FromQuery] string? search = null,
        CancellationToken ct = default)
    {
        var (items, meta) = await records.ListAsync(User.GetUserId(), workspaceId, collectionId, cursor, limit, search, ct);
        return Ok(ApiResponse<IReadOnlyList<RecordDto>>.Ok(items, meta));
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<RecordDto>>> Create(
        Guid workspaceId,
        Guid collectionId,
        [FromBody] CreateRecordRequest request,
        CancellationToken ct)
    {
        var result = await records.CreateAsync(User.GetUserId(), workspaceId, collectionId, request, ct);
        return Ok(ApiResponse<RecordDto>.Ok(result));
    }

    [HttpGet("{recordId:guid}")]
    public async Task<ActionResult<ApiResponse<RecordDto>>> Get(
        Guid workspaceId,
        Guid collectionId,
        Guid recordId,
        CancellationToken ct)
    {
        var result = await records.GetAsync(User.GetUserId(), workspaceId, collectionId, recordId, ct);
        return Ok(ApiResponse<RecordDto>.Ok(result));
    }

    [HttpPatch("{recordId:guid}")]
    public async Task<ActionResult<ApiResponse<RecordDto>>> Update(
        Guid workspaceId,
        Guid collectionId,
        Guid recordId,
        [FromBody] UpdateRecordRequest request,
        CancellationToken ct)
    {
        var result = await records.UpdateAsync(User.GetUserId(), workspaceId, collectionId, recordId, request, ct);
        return Ok(ApiResponse<RecordDto>.Ok(result));
    }

    [HttpDelete("{recordId:guid}")]
    public async Task<IActionResult> Delete(Guid workspaceId, Guid collectionId, Guid recordId, CancellationToken ct)
    {
        await records.DeleteAsync(User.GetUserId(), workspaceId, collectionId, recordId, ct);
        return NoContent();
    }
}
