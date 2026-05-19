# Matian Documentation Index

This documentation is the **architectural contract** for the project. Cursor and contributors must treat these specs as source of truth.

## How to use these docs

| When you are… | Read |
|---------------|------|
| Starting any feature | [domain-model.md](architecture/domain-model.md), relevant module spec |
| Building API endpoints | [api-contract.md](backend/api-contract.md), [api-conventions.md](backend/api-conventions.md) |
| Building UI | [ui-system.md](frontend/ui-system.md), [form-engine.md](frontend/form-engine.md) |
| Adding persistence | [database-schema.md](backend/database-schema.md) |
| Offline/sync work | [offline-sync.md](architecture/offline-sync.md), [offline-storage.md](frontend/offline-storage.md) |
| Shipping MVP | [mvp-checklist.md](implementation/mvp-checklist.md) |

## Structure

```
docs/
├── product/           # What we build and for whom
├── architecture/      # Cross-cutting system design
├── backend/           # Server implementation contract
├── frontend/          # Mobile implementation contract
├── engineering/       # How we build (standards, CI, testing)
└── implementation/    # Phased delivery plan
```

## Document layers

1. **Product** — vision, philosophy, users, use cases, roadmap
2. **Architecture** — system overview, domain model, permissions, security, sync
3. **Backend** — modules, schema, API contract, auth, events
4. **Frontend** — navigation, state, UI system, form engine, offline storage
5. **Engineering** — coding standards, git, testing, CI/CD, performance
6. **Implementation** — phase plans and MVP checklist

## Principles (non-negotiable)

- **Configurable, not hardcoded** — no industry-specific modules or per-collection SQL tables
- **Mobile first** — one-hand usage, camera-first, quick entry
- **Offline first** — local write path before server sync
- **Human language** — collection, property, item, workspace (never schema, entity, table)
