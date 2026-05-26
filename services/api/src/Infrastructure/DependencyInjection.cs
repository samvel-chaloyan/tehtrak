using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Tehtrak.Application.Abstractions;
using Tehtrak.Application.Authorization;
using Tehtrak.Infrastructure.Auth;
using Tehtrak.Infrastructure.Authorization;
using Tehtrak.Infrastructure.Persistence;
using Tehtrak.Infrastructure.Services;

namespace Tehtrak.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("Default")
            ?? throw new InvalidOperationException("Connection string 'Default' is required.");

        services.AddDbContext<TehtrakDbContext>(options =>
            options.UseNpgsql(connectionString)
                .UseSnakeCaseNamingConvention());

        services.AddScoped<IJwtTokenService, JwtTokenService>();
        services.AddScoped<IWorkspaceAuthorizationService, WorkspaceAuthorizationService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IWorkspaceService, WorkspaceService>();
        services.AddScoped<ICollectionService, CollectionService>();
        services.AddScoped<IFieldService, FieldService>();
        services.AddScoped<IRecordService, RecordService>();

        return services;
    }
}
