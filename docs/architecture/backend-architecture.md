# Backend Architecture

## Style

Clean Architecture + Modular Monolith.

```
src/
├── Api/              # Controllers, middleware, filters
├── Application/      # Use cases, commands, queries, DTOs
├── Domain/           # Entities, value objects, domain rules
├── Infrastructure/   # EF Core, storage, auth implementations
├── Shared/           # Cross-module primitives
└── Modules/          # Feature modules
```

## Layer rules

| Layer | Contains | Must NOT contain |
|-------|----------|------------------|
| Domain | Entities, enums, domain exceptions | EF, HTTP, DTOs |
| Application | Handlers, validators, interfaces | DbContext, controllers |
| Infrastructure | Repositories, EF configs, external APIs | Business rules |
| Api | Controllers, auth middleware | Business logic |

**Dependency direction:** Api → Application → Domain ← Infrastructure

## Module structure

Each module under `Modules/`:

```
Modules/{Name}/
├── Domain/
├── Application/
│   ├── Commands/
│   ├── Queries/
│   └── DTOs/
└── Infrastructure/
    └── Persistence/
```

Modules communicate via Application interfaces, not direct DbContext access across modules.

## Request pipeline

```
HTTP Request
  → Authentication middleware
  → Authorization (workspace scope)
  → Controller
  → MediatR handler (Application)
  → Domain validation
  → Repository (Infrastructure)
  → Response mapping
```

## CQRS convention

- **Commands** mutate state: `CreateCollectionCommand`
- **Queries** read state: `GetCollectionByIdQuery`
- One handler per command/query
- FluentValidation on commands

## Naming conventions

| Item | Convention | Example |
|------|------------|---------|
| Entity | PascalCase singular | `Collection` |
| Command | `{Verb}{Entity}Command` | `CreateRecordCommand` |
| Query | `Get{Entity}Query` / `List{Entities}Query` | `ListRecordsQuery` |
| Handler | `{Command}Handler` | `CreateRecordCommandHandler` |
| DTO | `{Entity}Dto` | `CollectionDto` |
| Repository interface | `I{Entity}Repository` | `IRecordRepository` |

## Dynamic data rule

Records stored as JSONB in `records.data`. Field definitions in `fields` table. **Never** create per-collection SQL tables.

## API surface

REST only in MVP. WebSocket for realtime in Phase 3.

See [api-contract.md](../backend/api-contract.md).

## Error handling

- Domain exceptions → mapped HTTP status in middleware
- Validation failures → 400 with structured error body
- Never leak stack traces in production

## Testing strategy

| Layer | Test type |
|-------|-----------|
| Domain | Unit tests |
| Application | Unit tests with mocked repos |
| Api | Integration tests (Testcontainers PostgreSQL) |
