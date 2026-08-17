# Matian Documentation Index

This documentation is the **architectural contract** for the project. Cursor and contributors must treat these specs as source of truth.

## How to use these docs

| When you are… | Read |
|---------------|------|
| Starting any feature | [domain-model.md](architecture/domain-model.md), relevant module spec |
| Building API endpoints | [api-contract.md](backend/api-contract.md), [api-conventions.md](backend/api-conventions.md) |
| Building UI | [frontend/README.md](frontend/README.md) (design hierarchy), [form-engine.md](frontend/form-engine.md) |
| Adding persistence | [database-schema.md](backend/database-schema.md) |
| Shipping the core notebook | [mvp-checklist.md](implementation/mvp-checklist.md), [phase-1.md](implementation/phase-1.md) |
| Offline/sync (enhancement) | [offline-sync.md](architecture/offline-sync.md), [offline-storage.md](frontend/offline-storage.md) |

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
4. **Frontend** — design language, UI system, screen patterns, form engine, navigation, state, offline storage
5. **Engineering** — coding standards, git, testing, CI/CD, performance
6. **Implementation** — phase plans and MVP checklist

## Principles (non-negotiable)

- **Configurable, not hardcoded** — no industry-specific modules or per-collection SQL tables
- **Mobile first** — one-hand usage, reachable actions, simple navigation
- **Human language** — collection, property, item, workspace (never schema, entity, table)
- **Online-first core (current ship)** — Auth → Workspace → Collection → Field → Item works against the API; offline/sync, sharing invites, attachments, server search, and activity feed are **enhancements**, not required to call the core notebook done (see [phase-1.md](implementation/phase-1.md) and [roadmap.md](product/roadmap.md))
