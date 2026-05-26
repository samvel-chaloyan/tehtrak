using Microsoft.Extensions.DependencyInjection;

namespace Tehtrak.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        return services;
    }
}
