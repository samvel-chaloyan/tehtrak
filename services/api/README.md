# Tehtrak API

ASP.NET Core modular monolith — Phase R2.

## Prerequisites

- .NET 10 SDK
- Docker

## Run PostgreSQL

```bash
cd services/api
docker compose up -d
```

## Run API

```bash
cd services/api/src/Api
dotnet run
```

- API: http://localhost:5000 (see `launchSettings.json`)
- Swagger: http://localhost:5000/swagger (Development)
- Health: http://localhost:5000/health

## Configuration

Copy `.env.example` to `.env` for local reference. Runtime uses `appsettings.json` and environment variables (`ConnectionStrings__Default`, `Jwt__Secret`, etc.).

## Architecture

```
src/
├── Api/              # Controllers, Program.cs
├── Application/      # DTOs, interfaces, validation
├── Domain/           # Entities, enums
└── Infrastructure/   # EF Core, services, JWT
```

Records use **JSONB** `data` — no per-collection tables.
