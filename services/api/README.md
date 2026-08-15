# Tehtrak API

ASP.NET Core modular monolith — Phase R2.

## Prerequisites

- .NET 10 SDK
- Docker
- EF Core tools (once): `dotnet tool install --global dotnet-ef`

## Run PostgreSQL

```bash
cd services/api
docker compose up -d
```

## Database migrations

Schema is managed with **EF Core migrations** (not `EnsureCreated`).

On API startup, pending migrations are applied automatically (`MigrateAsync`).

Create a new migration after model changes:

```bash
cd services/api/src/Api
dotnet ef migrations add <Name> --project ../Infrastructure --output-dir Persistence/Migrations
```

Apply without starting the API (optional):

```bash
cd services/api/src/Api
dotnet ef database update --project ../Infrastructure
```

Fresh local database (dev only — deletes data):

```bash
cd services/api
docker compose down -v
docker compose up -d
# then start the API — migrations recreate tables
```

## Run API

```bash
cd services/api/src/Api
dotnet run --launch-profile http
```

- API: http://localhost:5163
- Swagger: http://localhost:5163/swagger (Development)
- Health: http://localhost:5163/health

## Configuration

Copy `.env.example` to `.env` for local reference. Runtime uses `appsettings.json` and environment variables (`ConnectionStrings__Default`, `Jwt__Secret`, etc.).

## Architecture

```
src/
├── Api/              # Controllers, Program.cs
├── Application/      # DTOs, interfaces, validation
├── Domain/           # Entities, enums
└── Infrastructure/   # EF Core, services, JWT, Migrations
```

Records use **JSONB** `data` — no per-collection tables.
