namespace Tehtrak.Application.DTOs;

public sealed record UserDto(Guid Id, string Email, string DisplayName);

public sealed record AuthTokensDto(string AccessToken, string RefreshToken);

public sealed record RegisterRequest(string Email, string Password, string DisplayName);

public sealed record LoginRequest(string Email, string Password);

public sealed record RefreshRequest(string RefreshToken);

public sealed record AuthResponseDto(UserDto User, string AccessToken, string RefreshToken);

public sealed record RefreshResponseDto(string AccessToken, string RefreshToken);
