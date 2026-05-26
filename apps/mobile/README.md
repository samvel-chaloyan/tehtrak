# Tehtrak Mobile

Phase **R2** — API-backed operational runtime (auth, workspaces, collections, properties, entries).

## Stack

- Expo + React Native + TypeScript
- React Navigation
- Zustand + MMKV
- React Hook Form + Zod
- FlashList + Reanimated

## Run

1. Start PostgreSQL and API — see [`services/api/README.md`](../../services/api/README.md)
2. Mobile:

```bash
cd apps/mobile
npm install
npm start
```

Press `i` for iOS simulator or `a` for Android.

**API URL:** defaults to `http://localhost:5163/v1` (iOS) or `http://10.0.2.2:5163/v1` (Android emulator). Override with `EXPO_PUBLIC_API_URL`.

## Typecheck

```bash
npm run typecheck
```

## Architecture

```
src/
├── app/           # Root App + providers
├── core/          # API client (future)
├── features/      # Vertical slices (auth, workspaces, collections, items, properties)
├── shared/ui/     # Design system primitives
├── navigation/    # Auth + App stacks
├── core/api/      # Axios client, envelope, token refresh
├── store/         # Zustand (session UI, selected workspace)
├── theme/         # Tokens (#29B5E8 primary)
└── features/items # Metadata → Zod → RHF → field registry (unchanged from R1)
```

## Product identity

Calm operational notebook — not ERP, not dashboard-heavy admin tooling.

Primary color: `#29B5E8`

## Screenshots

Save milestones to [`docs/progress/`](../../docs/progress/README.md).
