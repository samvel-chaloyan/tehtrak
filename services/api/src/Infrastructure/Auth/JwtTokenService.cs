using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Tehtrak.Application.Abstractions;
using Tehtrak.Domain.Entities;

namespace Tehtrak.Infrastructure.Auth;

public sealed class JwtTokenService(IConfiguration configuration) : IJwtTokenService
{
    public string GenerateAccessToken(User user)
    {
        var secret = configuration["Jwt:Secret"] ?? throw new InvalidOperationException("Jwt:Secret is required");
        var issuer = configuration["Jwt:Issuer"] ?? "tehtrak";
        var audience = configuration["Jwt:Audience"] ?? "tehtrak-mobile";
        var minutes = int.TryParse(configuration["Jwt:AccessTokenMinutes"], out var m) ? m : 15;

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        var token = new JwtSecurityToken(
            issuer,
            audience,
            claims,
            expires: DateTime.UtcNow.AddMinutes(minutes),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public string GenerateRefreshToken()
    {
        var bytes = RandomNumberGenerator.GetBytes(64);
        return Convert.ToBase64String(bytes);
    }

    public string HashRefreshToken(string token)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(token));
        return Convert.ToHexString(bytes);
    }
}
