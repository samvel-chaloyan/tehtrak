# Tehtrak

A mobile-first platform for structuring real-world operations without technical knowledge.

**Product framing:** A calm operational notebook — a configurable operational memory system. Not ERP, not database software.

## Documentation

All architecture, contracts, and implementation guidance live in [`docs/`](docs/README.md).

| Layer | Purpose |
|-------|---------|
| [Product](docs/product/) | Vision, users, use cases, roadmap |
| [Architecture](docs/architecture/) | System design, domain model, security, sync |
| [Backend](docs/backend/) | Modules, schema, API, auth, events |
| [Frontend](docs/frontend/) | Navigation, state, UI system, form engine |
| [Engineering](docs/engineering/) | Standards, testing, CI/CD, performance |
| [Implementation](docs/implementation/) | Phases, MVP checklist |

## Implementation status

| Area | Status |
|------|--------|
| Documentation | Complete (architectural contract) |
| Mobile (`apps/mobile`) | Phase R1 — frontend foundation with mocked data |
| Backend | Not started (per phased plan) |

## Stack

| Layer | Technology |
|-------|------------|
| Mobile | React Native, TypeScript, Expo |
| Backend | ASP.NET Core, Clean Architecture, Modular Monolith |
| Database | PostgreSQL |
| Local (mobile) | SQLite (planned; MMKV for preferences in R1) |

## Core hierarchy

```
Workspace → Collections → Records → Fields
```

## Mobile app (Phase R1)

```bash
cd apps/mobile
npm install
npm start
```

See [apps/mobile/README.md](apps/mobile/README.md).

## Cursor workflow

1. Read relevant `docs/` specs before implementing a module.
2. Follow [engineering/coding-standards.md](docs/engineering/coding-standards.md) and [architecture/domain-model.md](docs/architecture/domain-model.md).
3. Implement one vertical slice at a time (see [implementation/phase-1.md](docs/implementation/phase-1.md)).
4. Do not introduce architecture decisions not documented here — propose doc updates first.
