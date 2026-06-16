# Offline Storage

> **Documentation layer:** Implementation. Not part of the design hierarchy. Index: [README.md](./README.md).

## SQLite schema (mobile)

Database name: `matian.db`

### `collections_local`

Mirror of server collections for active workspaces.

| Column | Type |
|--------|------|
| id | TEXT PK |
| workspace_id | TEXT |
| name | TEXT |
| description | TEXT |
| icon | TEXT |
| sort_order | INTEGER |
| updated_at | TEXT |
| synced_at | TEXT |
| deleted_at | TEXT |

### `fields_local`

| Column | Type |
|--------|------|
| id | TEXT PK |
| collection_id | TEXT |
| key | TEXT |
| label | TEXT |
| type | TEXT |
| config | TEXT (JSON) |
| required | INTEGER |
| sort_order | INTEGER |
| updated_at | TEXT |

### `records_local`

| Column | Type |
|--------|------|
| id | TEXT PK |
| workspace_id | TEXT |
| collection_id | TEXT |
| data | TEXT (JSON) |
| created_by | TEXT |
| created_at | TEXT |
| updated_at | TEXT |
| deleted_at | TEXT |
| sync_status | TEXT | pending, synced, conflict |

### `sync_operations`

| Column | Type |
|--------|------|
| id | TEXT PK |
| type | TEXT |
| entity | TEXT |
| entity_id | TEXT |
| payload | TEXT (JSON) |
| created_at | TEXT |
| retry_count | INTEGER |
| status | TEXT |
| last_error | TEXT |

## Service API

```typescript
// services/storage/database.ts
export const db = openDatabase('matian.db');

// services/storage/recordsRepository.ts
export async function upsertRecordLocal(record: LocalRecord): Promise<void>;
export async function getRecordsLocal(collectionId: string): Promise<LocalRecord[]>;

// services/sync/syncQueue.ts
export async function enqueueOperation(op: SyncOperation): Promise<void>;
export async function processSyncQueue(): Promise<SyncResult>;
```

## Read path

1. `useRecords` hook reads Query cache
2. Query `queryFn` reads SQLite first, returns immediately
3. Background fetch from API updates SQLite + cache

## Write path

1. Mutation writes SQLite with `sync_status: pending`
2. Optimistic Query cache update
3. Enqueue `sync_operations`
4. Trigger `processSyncQueue` if online

## Cache invalidation

On workspace switch:

- Do not delete other workspaces' data (multi-workspace offline)
- Filter reads by `workspace_id`

On logout:

- `DELETE FROM` all tables
- Clear MMKV except non-auth prefs

## Migrations

- `PRAGMA user_version` incremented per schema change
- Migration scripts in `services/storage/migrations/`

## MMKV keys

| Key | Value |
|-----|-------|
| `activeWorkspaceId` | string |
| `theme` | light |
| `fontScale` | 1.0 |
| `lastSyncAt:{workspaceId}` | ISO timestamp |
