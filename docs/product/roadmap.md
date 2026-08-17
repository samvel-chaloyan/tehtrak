# Product Roadmap

## Phase 1 — Core operational notebook — shipped

**Theme:** Online notebook for real-world information  
**Slice:** Auth → Workspace → Collection → Field → Item

| Feature | Status |
|---------|--------|
| Authentication (JWT + refresh) | Done |
| Workspaces (CRUD, description, pins) | Done |
| Collections CRUD | Done |
| Dynamic properties (fields) | Done |
| Records (items) CRUD + forms | Done |
| Notebook UI identity (calm lists, dialogs, drawer) | Done |
| Client list / cache search | Done (enough for now) |
| Server role checks + light UI hide | Done (enough for now) |

### Deferred enhancements (after core)

Not expected work unless prioritized. Move into Phase 2+ planning when ready.

| Feature | Notes |
|---------|--------|
| Member invite / sharing UI | API hooks may exist; product UI waits |
| Role expansion | Invites, admin screens, granular overrides |
| Offline cache + sync | Online-first is current product stance |
| Server-backed search | PostgreSQL `ILIKE` / workspace search API |
| Attachments (images) | Single image field + upload |
| Activity feed UI | Who changed what |
| Sentry | Crash reporting |
| Elderly / larger text mode | `fontScale` preference |

---

## Phase 2 — Operational depth

| Feature | Notes |
|---------|-------|
| Sharing & invites | Team notebooks |
| Attachments | Camera / images |
| Offline + sync | Field resilience |
| Server search | When cache-only feels thin |
| Barcode / QR | Camera integration |
| Collection templates | Marketplace later |
| Multiple views (table, kanban) | Metadata-driven |
| Push notifications | Reminders, alerts |

---

## Phase 3 — Platform

| Feature | Notes |
|---------|-------|
| Field-level permissions | Granular access |
| Automation rules | Triggers on record changes |
| Analytics dashboards | Usage + collection insights |
| AI suggestions | Field/collection recommendations |
| Realtime collaboration | WebSocket |
| Template marketplace | Community templates |

---

## Phase 4 — Scale

| Feature | Notes |
|---------|-------|
| Elasticsearch | Full-text search at scale |
| Selective microservices | Extract only when needed |
| Advanced audit | Compliance-oriented exports |

See [implementation/phase-1.md](../implementation/phase-1.md) for engineering breakdown.
