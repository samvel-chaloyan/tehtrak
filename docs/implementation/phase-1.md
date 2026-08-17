# Phase 1 — Core notebook (shipped)

## Goal

Deliver one complete **online** vertical slice:

**Auth → Workspace → Collection → Field → Item**

Feel: calm operational notebook (not admin CRUD).

## Status (current)

**Core slice: done** for a single-user / owner-first product.

Enhancements below are **not** required to call the core notebook complete. They must not divert implementation unless explicitly prioritized.

---

## Shipped milestones

### M1 — Project scaffolding — done

**Backend:** Clean Architecture solution, PostgreSQL + EF Core migrations, health, Swagger  
**Mobile:** Expo + TypeScript, theme tokens, Auth/App stacks, Axios envelope client

### M2 — Authentication — done

Register, login, refresh, logout · JWT + SecureStore · session restore · Welcome / Sign in / Create account

### M3 — Workspaces — done (owner-first)

Workspace CRUD API + UI · grid home · description · Quick Access pins · soft delete  
Server `IWorkspaceAuthorizationService` + workspace `role` on DTOs · light mobile UI gating  

**Deferred:** member invite UI, member management screens, role expansion beyond hide-actions

### M4 — Collections & fields — done

Collection CRUD · field CRUD · Customize fields UI · dynamic types (text, number, date, boolean, select)  
**Partial:** field reorder API exists; drag-reorder UI may still be thin

### M5 — Records (items) — done

Record CRUD + JSONB · dynamic forms · list / create / details+edit · swipe & long-press patterns · loading / empty / error states

---

## Deferred enhancements (not Phase 1 expected work)

These remain documented for later product depth. **Do not treat as unfinished MVP.**

| Theme | Examples |
|-------|----------|
| Offline | SQLite, sync queue, optimistic offline writes |
| Sharing | Invite members UI, role admin, collection-level overrides |
| Search | PostgreSQL `ILIKE` / server workspace search (client list + cache search is enough for now) |
| Attachments | Image upload / image field |
| Activity feed | “Who changed what” workspace history UI |
| Ops / a11y | Sentry, elderly `fontScale` mode |
| Field polish | Richer reorder UX, more field types |

---

## Vertical slice (current)

```
Auth → Workspace → Collection → Field → Item
```

Stopped here on purpose. Offline → server search → attachment are **enhancement lanes**, not the next mandatory steps.

---

## Definition of done (core notebook)

- [x] User can register, create workspace, collection with fields, add/edit/delete items
- [x] Data persists via API (JSONB records; no per-collection SQL tables)
- [x] App feels like Notebook → Section → Page
- [x] Empty / loading / error states on primary screens
- [ ] *(enhancement)* Offline record add/edit + sync
- [ ] *(enhancement)* Activity feed UI
- [ ] *(enhancement)* Attachments, server search, invites

---

## Out of scope (still)

- Barcode, QR, formula, relation fields
- Push notifications
- Realtime sync / collaboration
- Dark mode
- Elasticsearch
- Automation rules
