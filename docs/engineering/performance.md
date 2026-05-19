# Performance

## Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Cold app launch | < 2s | Sentry performance |
| Collection list (cached) | < 300ms | Local trace |
| Collection list (network) | < 500ms | API p95 |
| Record list scroll | 60fps | FlashList, no jank |
| API read p95 | < 200ms | Server APM |
| API write p95 | < 400ms | Server APM |
| Sync queue drain (10 ops) | < 5s | Client analytics |

## Mobile

### Lists

- Use `@shopify/flash-list` for all record/collection lists
- `estimatedItemSize` required
- Memoize `renderItem` with `useCallback`
- Avoid anonymous functions in list props

### Images

- Thumbnails for list views; full size on detail only
- Compress on upload (max 1920px long edge MVP)

### Bundle

- Lazy-load heavy screens (attachment viewer)
- No barrel exports that pull entire modules

### Re-renders

- Split Zustand selectors: `useStore(s => s.activeWorkspaceId)`
- React Query `select` to narrow data

## Backend

### Database

- Index all FK columns and common filters (see database-schema.md)
- GIN on `records.data` only when search ships
- Paginate all list endpoints; default limit 50, max 100
- Avoid `SELECT *` on JSONB for list — return `data` only when needed

### API

- Response compression (gzip)
- EF Core: `AsNoTracking()` on reads
- Project to DTOs in query, not in-memory after load

### Caching (Phase 2)

- Redis for workspace membership lookup
- HTTP cache headers on static field definitions

## Monitoring

- Sentry: crashes, slow transactions, sync failures
- Log slow queries > 100ms
- Alert on API error rate > 1% (production)

## Load testing (Phase 2)

- k6 scripts for record list + create under concurrent users
- Target: 100 concurrent users per instance MVP
