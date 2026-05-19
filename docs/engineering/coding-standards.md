# Coding Standards

## General

- Prefer clarity over cleverness
- No drive-by refactors in feature PRs
- Match existing patterns in each layer
- Every public API endpoint and hook has a clear single responsibility

## TypeScript (frontend)

- `strict: true` in tsconfig
- No `any`; use `unknown` + narrowing
- Prefer `interface` for object shapes; `type` for unions
- Explicit return types on exported functions
- Named exports over default exports

## C# (backend)

- Nullable reference types enabled
- Async all the way — no `.Result` or `.Wait()`
- `CancellationToken` on all async handlers
- File-scoped namespaces
- One public type per file

## Naming

| Context | Convention |
|---------|------------|
| TS variables/functions | camelCase |
| TS components/types | PascalCase |
| C# classes/methods | PascalCase |
| C# private fields | `_camelCase` |
| DB columns | snake_case |
| API JSON | camelCase |
| Field keys (domain) | snake_case |

## File organization

- Colocate tests: `*.test.ts` / `*.Tests.cs` next to or in mirror folder
- Max ~300 lines per file; split when exceeded
- No circular imports (frontend)

## Error handling

### Frontend

```typescript
// API errors
if (isApiError(error)) {
  showToast(error.error.message);
}
```

### Backend

- Throw domain exceptions; map in middleware
- Never catch `Exception` without rethrow unless logging

## Comments

- No obvious comments
- Document *why* for non-obvious business rules
- XML docs on public Application interfaces (backend)

## Dependencies

- New dependency requires justification in PR description
- Prefer stdlib / existing stack over new packages

## Prohibited

- `console.log` in production paths — use structured logger
- Hardcoded collection-specific logic
- SQL string concatenation
- Storing secrets in source control
