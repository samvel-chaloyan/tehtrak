# MVP Checklist

Use this before calling Phase 1 complete.

## Product

- [ ] User can explain app as "notebook for real-world things" without confusion
- [ ] No user-facing use of "schema", "entity", or "table"
- [ ] Elderly-friendly mode increases text size app-wide

## Authentication

- [ ] Register with email/password
- [ ] Login / logout
- [ ] Token refresh on 401
- [ ] Session survives app restart

## Workspaces

- [ ] Create workspace
- [ ] List user's workspaces
- [ ] Switch active workspace
- [ ] Invite member with role
- [ ] Owner/Admin/Manager/Worker/Viewer enforced server-side

## Collections

- [ ] Create, rename, delete (soft) collection
- [ ] Collection list per workspace
- [ ] Unique name per workspace

## Fields (properties)

- [ ] Add text, number, date, boolean, select fields
- [ ] Required flag enforced
- [ ] Reorder fields
- [ ] Select options configurable

## Records (items)

- [ ] Create record via dynamic form
- [ ] Edit record
- [ ] Delete record (soft)
- [ ] List records with pagination
- [ ] Values validated against field types server-side

## Offline

- [ ] View records offline
- [ ] Create/edit records offline
- [ ] Sync queue persists across app kill
- [ ] Sync on reconnect
- [ ] User notified on sync failure

## Search

- [ ] Search records within workspace or collection

## Attachments

- [ ] Upload image on image field
- [ ] View attached image

## Activity

- [ ] Record create/update appears in activity feed

## Quality

- [ ] Sentry reports crashes
- [ ] API p95 read < 200ms on staging
- [ ] List scroll 60fps on mid-range device
- [ ] No secrets in repository

## Architecture compliance

- [ ] No per-collection SQL tables
- [ ] Records use JSONB `data` column only
- [ ] Domain model matches docs/architecture/domain-model.md
- [ ] API responses use standard envelope

## Documentation

- [ ] README points to docs/
- [ ] API matches docs/backend/api-contract.md
- [ ] Any intentional deviations documented
