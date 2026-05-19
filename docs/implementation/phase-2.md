# Phase 2 — Operational Depth

## Prerequisites

Phase 1 complete and stable. Refactor sync layer before adding complexity.

## Features

### Field types

- [ ] `barcode` — camera scan
- [ ] `location` — map picker
- [ ] `relation` — link to another collection's records

### Views

- [ ] Table view (default, exists)
- [ ] Kanban view (group by select field)
- [ ] View config stored per collection

### Permissions

- [ ] Collection-level role overrides
- [ ] Field-level visibility
- [ ] Record-level assignee edit

### Sync improvements

- [ ] Conflict resolution UI
- [ ] Delta sync cursor per workspace
- [ ] Background sync (WorkManager / BGTask)

### Notifications

- [ ] Push token registration
- [ ] Low stock / date reminders (rule-based)

### Templates

- [ ] Built-in collection templates (parking, inventory, medicine)
- [ ] Apply template → collection + fields

## Technical debt to address first

- [ ] Extract sync engine into testable module
- [ ] Membership cache (Redis or in-memory)
- [ ] API integration test coverage > 70%

## Success criteria

- Parking center use case fully supported with barcode
- Team of 5+ members with mixed roles
- < 1% sync failure rate in analytics
