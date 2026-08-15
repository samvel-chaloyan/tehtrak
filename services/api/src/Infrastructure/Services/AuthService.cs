using Microsoft.EntityFrameworkCore;
using Tehtrak.Application.Abstractions;
using Tehtrak.Application.Common;
using Tehtrak.Application.DTOs;
using Tehtrak.Domain.Entities;
using Tehtrak.Infrastructure.Mapping;
using Tehtrak.Infrastructure.Persistence;

namespace Tehtrak.Infrastructure.Services;

public sealed class AuthService(
    TehtrakDbContext db,
    IJwtTokenService jwt) : IAuthService
{
    public async Task<AuthResponseDto> RegisterAsync(RegisterRequest request, CancellationToken ct = default)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var fieldErrors = new Dictionary<string, string[]>();
        if (string.IsNullOrWhiteSpace(request.DisplayName))
        {
            fieldErrors["displayName"] = ["Display name is required"];
        }

        if (string.IsNullOrEmpty(request.Password) || request.Password.Length < 8)
        {
            fieldErrors["password"] = ["Password must be at least 8 characters"];
        }

        if (fieldErrors.Count > 0)
        {
            throw new ServiceException("VALIDATION_ERROR", "Validation failed", 400, fieldErrors);
        }

        if (await db.Users.AnyAsync(u => u.Email == email && u.DeletedAt == null, ct))
        {
            throw new ServiceException("CONFLICT", "An account with this email already exists.", 409);
        }

        var now = DateTimeOffset.UtcNow;
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = email,
            DisplayName = request.DisplayName.Trim(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            CreatedAt = now,
            UpdatedAt = now,
        };

        db.Users.Add(user);
        await db.SaveChangesAsync(ct);

        return await IssueTokensAsync(user, ct);
    }

    public async Task<AuthResponseDto> LoginAsync(LoginRequest request, CancellationToken ct = default)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var user = await db.Users.FirstOrDefaultAsync(u => u.Email == email && u.DeletedAt == null, ct);

        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            throw new ServiceException("UNAUTHORIZED", "Invalid email or password.", 401);
        }

        return await IssueTokensAsync(user, ct);
    }

    public async Task<RefreshResponseDto> RefreshAsync(RefreshRequest request, CancellationToken ct = default)
    {
        var hash = jwt.HashRefreshToken(request.RefreshToken);
        var token = await db.RefreshTokens
            .Include(t => t.User)
            .FirstOrDefaultAsync(t => t.TokenHash == hash && t.RevokedAt == null, ct);

        if (token is null || token.ExpiresAt <= DateTimeOffset.UtcNow || token.User.DeletedAt != null)
        {
            throw new ServiceException("UNAUTHORIZED", "Session expired. Please sign in again.", 401);
        }

        token.RevokedAt = DateTimeOffset.UtcNow;
        var access = jwt.GenerateAccessToken(token.User);
        var refresh = jwt.GenerateRefreshToken();
        await StoreRefreshTokenAsync(token.UserId, refresh, ct);

        return new RefreshResponseDto(access, refresh);
    }

    public async Task LogoutAsync(RefreshRequest request, CancellationToken ct = default)
    {
        var hash = jwt.HashRefreshToken(request.RefreshToken);
        var token = await db.RefreshTokens.FirstOrDefaultAsync(t => t.TokenHash == hash, ct);
        if (token is not null)
        {
            token.RevokedAt = DateTimeOffset.UtcNow;
            await db.SaveChangesAsync(ct);
        }
    }

    public async Task<UserDto> GetMeAsync(Guid userId, CancellationToken ct = default)
    {
        var user = await db.Users.AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == userId && u.DeletedAt == null, ct);

        if (user is null)
        {
            throw new ServiceException("UNAUTHORIZED", "User not found.", 401);
        }

        return user.ToDto();
    }

    private async Task<AuthResponseDto> IssueTokensAsync(User user, CancellationToken ct)
    {
        var access = jwt.GenerateAccessToken(user);
        var refresh = jwt.GenerateRefreshToken();
        await StoreRefreshTokenAsync(user.Id, refresh, ct);
        return new AuthResponseDto(user.ToDto(), access, refresh);
    }

    private async Task StoreRefreshTokenAsync(Guid userId, string refreshToken, CancellationToken ct)
    {
        var days = 30;
        db.RefreshTokens.Add(new RefreshToken
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            TokenHash = jwt.HashRefreshToken(refreshToken),
            ExpiresAt = DateTimeOffset.UtcNow.AddDays(days),
            CreatedAt = DateTimeOffset.UtcNow,
        });
        await db.SaveChangesAsync(ct);
    }
}
