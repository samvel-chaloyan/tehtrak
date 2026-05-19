# Event & Activity System

## Purpose

- Audit trail for collaboration
- User-visible history ("John updated quantity 12 → 9")
- Foundation for notifications and automation (later)

## ActivityLog (MVP)

Synchronous write in same transaction as domain mutation (via MediatR pipeline behavior or explicit call in handler).

### Actions

| Action | entity_type | When |
|--------|-------------|------|
| `created` | Collection, Field, Record | After create |
| `updated` | Collection, Field, Record | After update |
| `deleted` | Collection, Field, Record | After soft delete |
| `member_joined` | WorkspaceMember | Invite accepted |
| `member_removed` | WorkspaceMember | Member removed |

### Payload examples

**Record updated:**

```json
{
  "changes": [
    { "field": "quantity", "label": "Quantity", "from": 12, "to": 9 }
  ]
}
```

**Collection created:**

```json
{
  "name": "Winter Food"
}
```

## Domain events (internal, Phase 2)

For automation, introduce in-process domain events:

```
RecordUpdatedEvent → NotificationHandler (future)
                   → AutomationHandler (future)
```

MVP: no MediatR notification handlers required beyond ActivityLog.

## Pipeline behavior (recommended)

```csharp
// Application/Behaviors/ActivityLoggingBehavior.cs
public class ActivityLoggingBehavior<TRequest, TResponse> : IPipelineBehavior<...>
```

Only for commands that implement `IActivityLoggable`.

## API

`GET /workspaces/:workspaceId/activity?cursor=&limit=30`

Response items:

```json
{
  "id": "uuid",
  "actor": { "id": "uuid", "displayName": "John" },
  "entityType": "Record",
  "entityId": "uuid",
  "action": "updated",
  "payload": {},
  "createdAt": "2026-05-18T14:32:00Z"
}
```

## Rules

- Activity logs are append-only
- No PII beyond display names in payload
- Retention: indefinite MVP; archival policy later
