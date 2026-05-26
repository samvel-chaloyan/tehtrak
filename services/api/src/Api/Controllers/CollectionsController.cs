using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tehtrak.Api.Extensions;
using Tehtrak.Application.Abstractions;
using Tehtrak.Application.Common;
using Tehtrak.Application.DTOs;

namespace Tehtrak.Api.Controllers;

[Authorize]
[ApiController]
[Route("v1/workspaces/{workspaceId:guid}/collections")]
public sealed class CollectionsController(ICollectionService collections) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<CollectionDto>>>> List(Guid workspaceId, CancellationToken ct)
    {
        var result = await collections.ListAsync(User.GetUserId(), workspaceId, ct);
        return Ok(ApiResponse<IReadOnlyList<CollectionDto>>.Ok(result));
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<CollectionDto>>> Create(
        Guid workspaceId,
        [FromBody] CreateCollectionRequest request,
        CancellationToken ct)
    {
        var result = await collections.CreateAsync(User.GetUserId(), workspaceId, request, ct);
        return Ok(ApiResponse<CollectionDto>.Ok(result));
    }

    [HttpGet("{collectionId:guid}")]
    public async Task<ActionResult<ApiResponse<CollectionDto>>> Get(Guid workspaceId, Guid collectionId, CancellationToken ct)
    {
        var result = await collections.GetAsync(User.GetUserId(), workspaceId, collectionId, ct);
        return Ok(ApiResponse<CollectionDto>.Ok(result));
    }

    [HttpPatch("{collectionId:guid}")]
    public async Task<ActionResult<ApiResponse<CollectionDto>>> Update(
        Guid workspaceId,
        Guid collectionId,
        [FromBody] UpdateCollectionRequest request,
        CancellationToken ct)
    {
        var result = await collections.UpdateAsync(User.GetUserId(), workspaceId, collectionId, request, ct);
        return Ok(ApiResponse<CollectionDto>.Ok(result));
    }

    [HttpDelete("{collectionId:guid}")]
    public async Task<IActionResult> Delete(Guid workspaceId, Guid collectionId, CancellationToken ct)
    {
        await collections.DeleteAsync(User.GetUserId(), workspaceId, collectionId, ct);
        return NoContent();
    }
}
