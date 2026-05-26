using Tehtrak.Application.DTOs;

namespace Tehtrak.Application.Abstractions;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterRequest request, CancellationToken ct = default);
    Task<AuthResponseDto> LoginAsync(LoginRequest request, CancellationToken ct = default);
    Task<RefreshResponseDto> RefreshAsync(RefreshRequest request, CancellationToken ct = default);
    Task LogoutAsync(RefreshRequest request, CancellationToken ct = default);
    Task<UserDto> GetMeAsync(Guid userId, CancellationToken ct = default);
}
