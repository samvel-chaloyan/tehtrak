# Database Schema

PostgreSQL. All timestamps `timestamptz`. All PKs `uuid` with `gen_random_uuid()`.

## Critical rule

**No dynamic table generation per collection.** Metadata in relational tables; record values in JSONB.

---

## users

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| email | varchar(255) UNIQUE NOT NULL | |
| password_hash | varchar NOT NULL | |
| display_name | varchar(100) NOT NULL | |
| created_at | timestamptz NOT NULL | |
| updated_at | timestamptz NOT NULL | |
| deleted_at | timestamptz NULL | soft delete |

---

## workspaces

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| name | varchar(100) NOT NULL | |
| slug | varchar(100) UNIQUE NOT NULL | |
| owner_id | uuid FK → users NOT NULL | |
| created_at | timestamptz NOT NULL | |
| updated_at | timestamptz NOT NULL | |
| deleted_at | timestamptz NULL | |

Index: `(owner_id)`, `(slug)`

---

## workspace_members

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| workspace_id | uuid FK → workspaces NOT NULL | |
| user_id | uuid FK → users NOT NULL | |
| role | varchar(20) NOT NULL | Owner, Admin, Manager, Worker, Viewer |
| joined_at | timestamptz NOT NULL | |

Unique: `(workspace_id, user_id)`  
Index: `(user_id)`, `(workspace_id)`

---

## collections

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| workspace_id | uuid FK → workspaces NOT NULL | |
| name | varchar(100) NOT NULL | |
| description | text NULL | |
| icon | varchar(50) NULL | emoji or icon key |
| sort_order | int NOT NULL DEFAULT 0 | |
| created_at | timestamptz NOT NULL | |
| updated_at | timestamptz NOT NULL | |
| deleted_at | timestamptz NULL | |

Unique: `(workspace_id, name)` WHERE deleted_at IS NULL  
Index: `(workspace_id, sort_order)`

---

## fields

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| collection_id | uuid FK → collections NOT NULL | |
| key | varchar(64) NOT NULL | snake_case, stable |
| label | varchar(100) NOT NULL | |
| type | varchar(20) NOT NULL | FieldType enum |
| config | jsonb NOT NULL DEFAULT '{}' | options, min/max, etc. |
| required | boolean NOT NULL DEFAULT false | |
| sort_order | int NOT NULL DEFAULT 0 | |
| created_at | timestamptz NOT NULL | |
| updated_at | timestamptz NOT NULL | |
| deleted_at | timestamptz NULL | |

Unique: `(collection_id, key)` WHERE deleted_at IS NULL  
Index: `(collection_id, sort_order)`

### Field config examples

```json
// select
{ "options": [{ "value": "paid", "label": "Paid" }] }

// number
{ "min": 0, "max": 9999, "decimals": 0 }

// relation (Phase 2)
{ "targetCollectionId": "uuid" }
```

---

## records

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| workspace_id | uuid FK → workspaces NOT NULL | denormalized for auth |
| collection_id | uuid FK → collections NOT NULL | |
| created_by | uuid FK → users NOT NULL | |
| data | jsonb NOT NULL DEFAULT '{}' | field key → value |
| created_at | timestamptz NOT NULL | |
| updated_at | timestamptz NOT NULL | |
| deleted_at | timestamptz NULL | |

Index: `(collection_id, created_at DESC)`  
Index: `(workspace_id)`  
GIN index: `data` jsonb_path_ops (Phase 1 if search needed)

### Example data

```json
{
  "plate_number": "35AB123",
  "enter_time": "2026-05-18T14:32:00Z",
  "payment_status": true
}
```

---

## attachments

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| workspace_id | uuid FK NOT NULL | |
| record_id | uuid FK → records NOT NULL | |
| file_name | varchar(255) NOT NULL | |
| mime_type | varchar(100) NOT NULL | |
| size_bytes | bigint NOT NULL | |
| storage_key | varchar(500) NOT NULL | object storage path |
| created_by | uuid FK → users NOT NULL | |
| created_at | timestamptz NOT NULL | |
| deleted_at | timestamptz NULL | |

Index: `(record_id)`

---

## activity_logs

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| workspace_id | uuid FK NOT NULL | |
| actor_id | uuid FK → users NOT NULL | |
| entity_type | varchar(50) NOT NULL | Collection, Record, Field, etc. |
| entity_id | uuid NOT NULL | |
| action | varchar(50) NOT NULL | created, updated, deleted |
| payload | jsonb NOT NULL DEFAULT '{}' | |
| created_at | timestamptz NOT NULL | |

Index: `(workspace_id, created_at DESC)`

---

## refresh_tokens

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK NOT NULL | |
| token_hash | varchar NOT NULL | |
| expires_at | timestamptz NOT NULL | |
| created_at | timestamptz NOT NULL | |
| revoked_at | timestamptz NULL | |

Index: `(user_id)`, `(token_hash)`

---

## Value type validation (application layer)

| Field type | JSON type | Validation |
|------------|-----------|------------|
| text | string | max length from config |
| number | number | min/max |
| date | string (ISO8601) | parseable date |
| boolean | boolean | |
| select | string | value in options |
| multiselect | array of strings | all in options |
| image | string (attachment id) | attachment exists |

---

## Migrations

- EF Core migrations in `Infrastructure/Persistence/Migrations`
- One migration per logical change
- Never edit applied migrations; add new ones
