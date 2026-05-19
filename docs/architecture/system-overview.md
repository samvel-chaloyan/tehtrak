# System Overview

## High-level architecture

```
Mobile App (React Native / Expo)
        ↓ HTTPS
API Layer (ASP.NET Core)
        ↓
PostgreSQL
        ↓
Object Storage (attachments)
```

## Backend style

**Modular monolith** — single deployable, bounded modules, clear interfaces.

Evolution path:

```
Modular Monolith → Service Extraction → Selective Microservices
```

Extract services only when operational need is proven.

## Core data flow (online)

```
User action → API → Application use case → Repository → PostgreSQL
                      ↓
                 ActivityLog event
```

## Core data flow (offline)

```
User action → Local SQLite → Optimistic UI → Sync Queue → API (when online)
```

See [offline-sync.md](offline-sync.md).

## Technology stack

| Layer | Choice |
|-------|--------|
| Mobile | React Native, TypeScript, Expo (bare-capable) |
| Navigation | React Navigation |
| Client state | Zustand |
| Server state | TanStack Query |
| HTTP | Axios |
| Forms | React Hook Form + Zod |
| Local persistence | SQLite (MVP), MMKV for preferences |
| Backend | ASP.NET Core, Clean Architecture |
| API | REST (WebSocket later) |
| Database | PostgreSQL |
| Monitoring | Sentry |
| Files | Cloud object storage |

## Scalability (initial → later)

| Initial | Later |
|---------|-------|
| Single backend instance | Horizontal scaling behind load balancer |
| PostgreSQL | Read replicas, connection pooling |
| PostgreSQL search | Elasticsearch |
| — | Redis cache |
| — | Background workers |
| — | WebSocket service |

## Module map (backend)

```
Modules/
├── Auth/
├── Workspaces/
├── Collections/
├── Fields/
├── Records/
├── Permissions/
├── Activity/
├── Notifications/    (Phase 2)
├── Attachments/
└── Analytics/        (Phase 2)
```

## Non-functional requirements

### Performance

| Metric | Target |
|--------|--------|
| Cold app launch | < 2s |
| Collection list load (cached) | < 300ms |
| Collection load (network) | < 500ms |
| Record list scroll | 60fps (FlashList) |
| API p95 (read) | < 200ms |

### Reliability

| Requirement | Implementation |
|-------------|----------------|
| Offline core flows | SQLite + sync queue |
| Sync retry | Exponential backoff, max 5 retries |
| Queue persistence | Survive app kill |
| Crash reporting | Sentry |
| Conflict recovery | Last-write-wins MVP; manual resolve Phase 2 |

### Security

- TLS everywhere
- JWT access + refresh rotation
- Server-side authorization on every request
- Rate limiting on auth endpoints
- Audit via ActivityLog

See [security.md](security.md) and [permissions.md](permissions.md).
