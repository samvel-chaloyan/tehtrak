# Permissions Architecture

## Model (MVP)

Role-based access control at **workspace** level via `WorkspaceMember.role`.

## Roles

| Role | Workspace | Members | Collections | Fields | Records |
|------|-----------|---------|-------------|--------|---------|
| Owner | Delete, settings | All | All | All | All |
| Admin | Settings | Invite/remove (not Owner) | CRUD | CRUD | All |
| Manager | Read | Read | CRUD | CRUD | CRUD |
| Worker | Read | — | Read | Read | Create, update own* |
| Viewer | Read | — | Read | Read | Read |

\* "Own" = `createdBy == currentUserId` for MVP Worker update/delete; Admin+ can edit any.

## Enforcement

1. **Every** API endpoint checks workspace membership + role
2. Checks live in Application layer (`IWorkspaceAuthorizationService`), not controllers
3. Client hides UI actions user cannot perform — **not** a security boundary

### Mobile UI gating (MVP)

Workspace list responses include `role` for the signed-in member. The app uses that to hide:

| Action | Minimum role |
|--------|--------------|
| Delete workspace | Owner |
| Edit workspace name / description | Admin |
| Create / edit / delete collections & fields | Manager |
| Create / edit / delete items | Worker |
| Read / search / pin | Viewer |

Helpers live in `apps/mobile/src/features/workspaces/utils/permissions.ts`.

## Authorization flow

```
Request + JWT
  → Resolve userId
  → Resolve workspaceId from route or resource
  → Load member role (cached per request)
  → Evaluate permission for action
  → 403 if denied
```

## Future (Phase 2+)

| Level | Example |
|-------|---------|
| Collection | Worker can edit "Vehicles" but not "Finance" |
| Field | Hide salary field from Workers |
| Record | Assignee-only edit |

Design hooks: `permissions` table with `scopeType`, `scopeId`, `role`, `actions[]`.

MVP: do not implement granular tables; keep interface ready.

## Permission codes (for errors)

```
WORKSPACE_ACCESS_DENIED
INSUFFICIENT_ROLE
RESOURCE_NOT_FOUND        # Use instead of 403 when hiding existence
```

## Ownership rules

- Workspace owner cannot be removed without ownership transfer
- Last Owner cannot demote themselves
- Deleting workspace requires Owner role
