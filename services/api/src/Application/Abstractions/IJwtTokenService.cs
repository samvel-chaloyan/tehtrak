using Tehtrak.Domain.Entities;

namespace Tehtrak.Application.Abstractions;

public interface IJwtTokenService
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken();
    string HashRefreshToken(string token);
}
