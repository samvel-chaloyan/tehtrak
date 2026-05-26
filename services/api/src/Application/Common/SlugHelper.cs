using System.Text.RegularExpressions;

namespace Tehtrak.Application.Common;

public static partial class SlugHelper
{
    public static string FromName(string name)
    {
        var slug = name.Trim().ToLowerInvariant();
        slug = NonAlphanumeric().Replace(slug, "-");
        slug = DuplicateHyphens().Replace(slug, "-").Trim('-');
        return string.IsNullOrWhiteSpace(slug) ? "workspace" : slug[..Math.Min(slug.Length, 100)];
    }

    [GeneratedRegex(@"[^a-z0-9]+")]
    private static partial Regex NonAlphanumeric();

    [GeneratedRegex(@"-+")]
    private static partial Regex DuplicateHyphens();
}
