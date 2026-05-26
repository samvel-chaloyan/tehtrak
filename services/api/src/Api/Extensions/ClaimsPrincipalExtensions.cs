using System.Security.Claims;

namespace Tehtrak.Api.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static Guid GetUserId(this ClaimsPrincipal user)
    {
        var sub = user.FindFirstValue(ClaimTypes.NameIdentifier) ?? user.FindFirstValue("sub");
        if (sub is null || !Guid.TryParse(sub, out var id))
        {
            throw new UnauthorizedAccessException();
        }

        return id;
    }
}
