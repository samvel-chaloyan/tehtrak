# Agent Instructions (Cursor)

You are implementing **Tehtrak** — a mobile-first configurable operational memory system (calm operational notebook).

## Before writing code

1. Read [docs/README.md](docs/README.md) and the relevant spec for your task.
2. For domain logic: [docs/architecture/domain-model.md](docs/architecture/domain-model.md)
3. For APIs: [docs/backend/api-contract.md](docs/backend/api-contract.md)
4. For UI: [docs/frontend/ui-system.md](docs/frontend/ui-system.md) + [docs/frontend/form-engine.md](docs/frontend/form-engine.md)

## Non-negotiable rules

- **Metadata + JSONB** for records — never create SQL tables per collection
- **Mobile first** — bottom actions, large touch targets, offline write path
- **Server-side authorization** on every mutating endpoint
- **Human language** in user-facing copy (workspace, collection, item, property)
- **No hardcoded** industry/collection-specific features

## Implementation order

Follow [docs/implementation/phase-1.md](docs/implementation/phase-1.md):

```
Auth → Workspace → Collection → Field → Record → Offline → Search → Attachment
```

Do not implement later milestones before earlier ones are complete.

## When unsure

- Do not invent architecture — ask or propose a doc update
- Prefer extending existing patterns over new abstractions
- Keep PRs focused on one module or vertical slice

## Stack reference

| Area | Stack |
|------|-------|
| Mobile | React Native, Expo, TypeScript, Zustand, TanStack Query, Axios, SecureStore |
| Backend | ASP.NET Core, Clean Architecture, PostgreSQL, EF Core (`services/api/`) |
| Local DB | SQLite (offline phase — not R2) |

## Coding standards

[docs/engineering/coding-standards.md](docs/engineering/coding-standards.md)
