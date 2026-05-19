# Offline & Sync Architecture

## Requirement

Core flows must work with zero network: view collections, view/add/edit records, queue changes.

## Local storage

| Data | Store | Notes |
|------|-------|-------|
| Records, collections, fields | SQLite | Mirror of server metadata + record data |
| Auth tokens | Secure storage (Keychain/Keystore) | Never SQLite |
| User preferences | MMKV | Theme, text size |
| Sync queue | SQLite `sync_operations` table | Durable across restarts |

WatermelonDB is an option for Phase 2 if relational sync complexity grows.

## Offline flow

```
User Action
    ↓
Write to SQLite (immediate)
    ↓
Optimistic UI update
    ↓
Enqueue sync operation
    ↓
[When online] Sync worker processes queue
    ↓
Server confirms → mark operation synced
```

## Sync operation schema (local)

```typescript
interface SyncOperation {
  id: string;              // UUID, client-generated
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  entity: 'record' | 'collection' | 'field';
  entityId: string;
  payload: string;         // JSON
  createdAt: string;       // ISO8601
  retryCount: number;
  status: 'pending' | 'syncing' | 'failed' | 'synced';
  lastError?: string;
}
```

## Sync worker behavior

1. On app foreground + network available → process queue FIFO
2. On API success → update local row with server version, mark synced
3. On 4xx (except 409) → mark failed, surface to user
4. On 5xx / network → retry with exponential backoff (1s, 2s, 4s, 8s, 16s; max 5)
5. On 409 conflict → MVP: server wins, overwrite local with server response + notify user

## Conflict resolution

| Phase | Strategy |
|-------|----------|
| MVP | Last-write-wins (server timestamp authoritative) |
| Phase 2 | Field-level merge + user conflict UI |

## Delta sync (Phase 2)

MVP uses full collection fetch on sync. Later: `GET /sync?since={cursor}` per workspace.

## Background sync

- iOS: `BGAppRefreshTask` for queue drain (best effort)
- Android: `WorkManager` periodic sync
- MVP minimum: sync on app open and pull-to-refresh

## Monitoring

Track in analytics: `sync_failure`, `sync_queue_depth`, `sync_duration_ms`.

## Failure modes

| Scenario | Behavior |
|----------|----------|
| App killed mid-sync | Queue persists; resume on next launch |
| Token expired during sync | Refresh token; retry operation |
| Collection deleted on server | Remove local mirror; drop pending ops for that collection |
| User logged out | Clear SQLite workspace data; keep queue only if same user re-login |

See [offline-storage.md](../frontend/offline-storage.md) for implementation details.
