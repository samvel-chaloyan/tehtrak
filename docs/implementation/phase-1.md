# Phase 1 — MVP Implementation

## Goal

Deliver one complete vertical slice: auth → workspace → collection → fields → records, with basic offline and permissions.

## Milestones

### M1 — Project scaffolding

**Backend**
- [ ] Solution structure (Api, Application, Domain, Infrastructure, Modules)
- [ ] PostgreSQL + EF Core + Docker Compose
- [ ] Health check endpoint
- [ ] Swagger in development

**Mobile**
- [ ] Expo + TypeScript project
- [ ] Folder structure per frontend-architecture.md
- [ ] Theme tokens + ThemeProvider
- [ ] Navigation shell (Auth + App stacks)
- [ ] Axios client + API envelope types

### M2 — Authentication

- [ ] Register, login, refresh, logout endpoints
- [ ] JWT + refresh token rotation
- [ ] Secure token storage on mobile
- [ ] Session restoration on launch
- [ ] Auth screens (login, register)

### M3 — Workspaces

- [ ] Workspace CRUD API
- [ ] Member list + invite (email invite simplified: direct add by email MVP)
- [ ] Role assignment
- [ ] Workspace list + switcher UI
- [ ] `IWorkspaceAuthorizationService`

### M4 — Collections & fields

- [ ] Collection CRUD API + UI
- [ ] Field CRUD API
- [ ] Field editor UI (admin/manager)
- [ ] Field reorder

### M5 — Records

- [ ] Record CRUD API with JSONB validation
- [ ] Dynamic form engine (text, number, date, boolean, select)
- [ ] Record list (FlashList)
- [ ] Record create/edit screens
- [ ] Activity log on record changes

### M6 — Offline (basic)

- [ ] SQLite schema + repositories
- [ ] Read-from-local-first in Query hooks
- [ ] Sync queue + worker
- [ ] Optimistic create/update records

### M7 — Polish for MVP

- [ ] Search within collection (PostgreSQL `ILIKE` on data)
- [ ] Image attachment upload (single image field)
- [ ] Empty states, loading states, error toasts
- [ ] Sentry integration
- [ ] Permissions enforced + UI hidden by role

## Vertical slice order (strict)

Implement in this order — do not skip ahead:

```
Auth → Workspace → Collection → Field → Record → Offline → Search → Attachment
```

## Definition of done (Phase 1)

- User can register, create workspace, collection with 3+ field types, add 20+ records
- App works offline for record add/edit; syncs on reconnect
- Worker role cannot manage collections
- Activity shows record updates
- No per-collection SQL tables exist

## Out of scope (Phase 1)

- Barcode, QR, formula, relation fields
- Push notifications
- Realtime sync
- Dark mode
- Elasticsearch
- Automation rules

## Estimated sequencing

| Milestone | Depends on |
|-----------|------------|
| M1 | — |
| M2 | M1 |
| M3 | M2 |
| M4 | M3 |
| M5 | M4 |
| M6 | M5 |
| M7 | M5, M6 |
