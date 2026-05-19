# Domain Model

Formal definitions for all core domain objects. Implementation must not violate these contracts.

---

## User

**Purpose:** Identity for authentication and attribution.

| Aspect | Rule |
|--------|------|
| Ownership | Global; not scoped to workspace |
| Lifecycle | Registered → active → deactivated (soft) |
| Key attributes | `id`, `email`, `displayName`, `createdAt` |
| Relationships | Many `WorkspaceMember`; creates `Record`, `ActivityLog` |

**Constraints:**
- Email unique, required
- Display name required, max 100 chars

---

## Workspace

**Purpose:** Top-level container for all operational data belonging to one organization or context.

| Aspect | Rule |
|--------|------|
| Ownership | Owned by one `User` (owner) |
| Lifecycle | Created → active → archived (soft delete) |
| Key attributes | `id`, `name`, `slug`, `ownerId`, `createdAt`, `updatedAt` |
| Relationships | Has many `Collection`, `WorkspaceMember`, `ActivityLog` |

**Constraints:**
- Name required, 1–100 chars
- Slug unique globally, URL-safe
- At least one member with Owner role (the creator)

---

## WorkspaceMember

**Purpose:** Links a user to a workspace with a role.

| Aspect | Rule |
|--------|------|
| Ownership | Belongs to `Workspace` |
| Lifecycle | Invited → active → removed |
| Key attributes | `id`, `workspaceId`, `userId`, `role`, `joinedAt` |
| Relationships | Belongs to `Workspace` and `User` |

**Constraints:**
- Unique (`workspaceId`, `userId`)
- Role must be valid enum: Owner, Admin, Manager, Worker, Viewer

---

## Role

**Purpose:** Named permission bundle (not a separate table in MVP; enum on `WorkspaceMember`).

| Role | Capabilities (MVP) |
|------|-------------------|
| Owner | Full control, delete workspace, transfer ownership |
| Admin | Manage members, collections, all records |
| Manager | Manage collections and records; cannot delete workspace |
| Worker | Create/update records; read collections |
| Viewer | Read-only |

Field-level and record-level permissions are Phase 2.

---

## Collection

**Purpose:** Configurable container of structured items (records) within a workspace.

| Aspect | Rule |
|--------|------|
| Ownership | Belongs to exactly one `Workspace` |
| Lifecycle | Created → active → archived (soft delete) |
| Key attributes | `id`, `workspaceId`, `name`, `description`, `icon`, `sortOrder`, `createdAt`, `updatedAt`, `deletedAt` |
| Relationships | Has many `Field`, `Record`; belongs to `Workspace` |

**Constraints:**
- Name required, 1–100 chars
- Name unique within workspace (among non-deleted)
- Soft deletable; records retained unless purge policy added later

---

## Field

**Purpose:** Defines a single property on all records in a collection (metadata, not a SQL column).

| Aspect | Rule |
|--------|------|
| Ownership | Belongs to exactly one `Collection` |
| Lifecycle | Created → active → archived (soft delete) |
| Key attributes | `id`, `collectionId`, `key`, `label`, `type`, `config`, `required`, `sortOrder`, `createdAt` |
| Relationships | Belongs to `Collection`; values stored in `Record.data` JSONB |

**Constraints:**
- `key` unique within collection (snake_case, stable after first record)
- `label` required (user-facing name)
- `type` must be valid field type enum
- Changing `key` after records exist requires migration strategy (Phase 2); MVP: disallow key change

**Field types:** `text`, `number`, `date`, `boolean`, `select`, `multiselect`, `image`, `barcode`, `relation`, `formula`, `location`

MVP implements: `text`, `number`, `date`, `boolean`, `select`, `multiselect`, `image`.

---

## Record

**Purpose:** One item/row in a collection.

| Aspect | Rule |
|--------|------|
| Ownership | Belongs to `Collection` → `Workspace` |
| Lifecycle | Created → updated → soft deleted |
| Key attributes | `id`, `workspaceId`, `collectionId`, `createdBy`, `createdAt`, `updatedAt`, `deletedAt`, `data` (JSONB) |
| Relationships | Belongs to `Collection`; optional `Attachment`s; generates `ActivityLog` |

**Constraints:**
- `data` keys must match active field keys for the collection
- Required fields must be present on create/update
- Values validated by field type rules server-side

---

## RecordValue (logical)

**Purpose:** Not a separate table. Values live in `Record.data` as `{ [fieldKey]: value }`.

Validation runs in application layer against `Field` metadata.

---

## Attachment

**Purpose:** File linked to a record (photo, PDF, receipt).

| Aspect | Rule |
|--------|------|
| Ownership | Belongs to `Record` |
| Lifecycle | Uploaded → active → deleted |
| Key attributes | `id`, `recordId`, `workspaceId`, `fileName`, `mimeType`, `sizeBytes`, `storageKey`, `createdBy`, `createdAt` |

**Constraints:**
- Max file size per plan (MVP: 10 MB images)
- Allowed MIME types enforced server-side

---

## ActivityLog

**Purpose:** Immutable audit of changes for collaboration and history.

| Aspect | Rule |
|--------|------|
| Ownership | Belongs to `Workspace` |
| Lifecycle | Append-only |
| Key attributes | `id`, `workspaceId`, `actorId`, `entityType`, `entityId`, `action`, `payload`, `createdAt` |

**Example payload:** `{ "field": "quantity", "from": 12, "to": 9 }`

**Constraints:**
- Never updated or hard-deleted in MVP

---

## Permission (logical, MVP)

**Purpose:** Authorization decision based on `WorkspaceMember.role` + resource scope.

Enforced server-side on every mutating endpoint. Client-side checks are UX only.

---

## Entity relationship summary

```
User 1──* WorkspaceMember *──1 Workspace
Workspace 1──* Collection
Collection 1──* Field
Collection 1──* Record
Record 1──* Attachment
Workspace 1──* ActivityLog
User 1──* ActivityLog (as actor)
```

---

## Critical architectural rule

**DO NOT** generate real SQL tables per collection. Use metadata tables + `Record.data` JSONB only.

See [database-schema.md](../backend/database-schema.md).
