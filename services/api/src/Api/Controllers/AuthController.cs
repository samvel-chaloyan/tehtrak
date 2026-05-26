using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tehtrak.Api.Extensions;
using Tehtrak.Application.Abstractions;
using Tehtrak.Application.Common;
using Tehtrak.Application.DTOs;

namespace Tehtrak.Api.Controllers;

[ApiController]
[Route("v1/auth")]
public sealed class AuthController(IAuthService auth) : ControllerBase
{
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<ApiResponse<AuthResponseDto>>> Register([FromBody] RegisterRequest request, CancellationToken ct)
    {
        var result = await auth.RegisterAsync(request, ct);
        return Ok(ApiResponse<AuthResponseDto>.Ok(result));
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<AuthResponseDto>>> Login([FromBody] LoginRequest request, CancellationToken ct)
    {
        var result = await auth.LoginAsync(request, ct);
        return Ok(ApiResponse<AuthResponseDto>.Ok(result));
    }

    [AllowAnonymous]
    [HttpPost("refresh")]
    public async Task<ActionResult<ApiResponse<RefreshResponseDto>>> Refresh([FromBody] RefreshRequest request, CancellationToken ct)
    {
        var result = await auth.RefreshAsync(request, ct);
        return Ok(ApiResponse<RefreshResponseDto>.Ok(result));
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromBody] RefreshRequest request, CancellationToken ct)
    {
        await auth.LogoutAsync(request, ct);
        return NoContent();
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<ApiResponse<UserDto>>> Me(CancellationToken ct)
    {
        var user = await auth.GetMeAsync(User.GetUserId(), ct);
        return Ok(ApiResponse<UserDto>.Ok(user));
    }
}
