# Core notebook checklist

Use this to confirm the **shipped** Auth → Item slice.  
Deferred enhancements live at the bottom — they are **not** blockers.

## Product

- [x] User can explain app as "notebook for real-world things" without confusion
- [x] No user-facing use of "schema", "entity", or "table"
- [ ] Elderly-friendly larger text — **deferred**

## Authentication

- [x] Register with email/password
- [x] Login / logout
- [x] Token refresh on 401
- [x] Session survives app restart

## Workspaces

- [x] Create workspace
- [x] List user's workspaces
- [x] Open / switch into a workspace (collections)
- [x] Edit name / description; soft-delete (owner)
- [ ] Invite member with role — **deferred**
- [x] Roles enforced server-side; mutating UI hidden by role (light)

## Collections

- [x] Create, rename, delete (soft) collection
- [x] Collection list per workspace

## Fields (properties)

- [x] Add text, number, date, boolean, select fields
- [x] Required flag
- [ ] Reorder fields (polished drag UI) — **partial / polish later**
- [x] Select options configurable

## Records (items)

- [x] Create item via dynamic form
- [x] Edit item
- [x] Delete item (soft)
- [x] List items
- [x] Values stored in JSONB; validated against field types server-side

## Search (current)

- [x] Filter within list screens (client)
- [x] Drawer global search over already-fetched cache
- [ ] Server-backed search — **deferred**

## Architecture compliance

- [x] No per-collection SQL tables
- [x] Records use JSONB `data` column only
- [x] API responses use standard envelope

## Quality (core)

- [x] Primary screens: loading / empty / error
- [x] No secrets in repository
- [ ] Sentry crash reporting — **deferred**
- [ ] Perf targets on staging — **when we have staging**

---

## Deferred enhancements (not core blockers)

### Offline

- [ ] View / create / edit offline
- [ ] Sync queue + reconnect

### Sharing

- [ ] Invite members UI
- [ ] Role admin / deeper permission UX

### Attachments

- [ ] Upload / view image on image field

### Activity

- [ ] Activity feed UI (“who changed what”)

### Ops / a11y

- [ ] Sentry
- [ ] App-wide elderly / `fontScale` mode

---

## Documentation

- [x] README points to docs/
- [x] Core API matches docs/backend/api-contract.md (deviations called out when intentional)
- [x] Phase 1 / roadmap mark deferred work explicitly
