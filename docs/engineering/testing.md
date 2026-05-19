# Testing

## Strategy

| Layer | Tool | Focus |
|-------|------|-------|
| Backend unit | xUnit + FluentAssertions | Domain, Application handlers |
| Backend integration | xUnit + Testcontainers | API + PostgreSQL |
| Frontend unit | Jest | Utils, Zod schema builder |
| Frontend component | React Native Testing Library | Form engine, shared UI |
| E2E | Detox (Phase 2) | Critical flows |

## Backend

### Unit test example scope

- `RecordValidator` — JSONB against field metadata
- `WorkspaceAuthorizationService` — role matrix
- Command handlers with mocked `IRepository`

### Integration test example scope

```
POST /workspaces → POST /collections → POST /fields → POST /records → GET /records
```

- Auth flow: register → login → refresh
- Permission: Worker cannot delete collection

### Test data

- Use factories/builders in `tests/TestHelpers/`
- Each test owns its data; no shared mutable state

## Frontend

### Priority tests (MVP)

1. `buildZodSchema` — all field types
2. `fieldSchema` validation edge cases
3. API client error parsing
4. Sync queue enqueue/dequeue logic

### Component tests

- `DynamicRecordForm` renders correct inputs per field type
- Required field validation messages

## Coverage targets (MVP)

| Area | Target |
|------|--------|
| Application handlers | 80% |
| Domain validators | 90% |
| Form engine / Zod | 85% |
| UI components | 50% (critical paths) |

## CI

- All tests run on PR
- Integration tests may run only on `main` if slow (document in ci-cd.md)

## What not to test

- Third-party library internals
- Generated EF migrations
- Snapshot-only tests with no assertion value
