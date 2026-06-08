# Tehtrak Mobile

Phase **R2** — API-backed operational runtime (auth, workspaces, collections, properties, entries).

## Stack

- Expo + React Native + TypeScript
- React Navigation
- Zustand + AsyncStorage (demo mode)
- React Hook Form + Zod
- FlashList + Reanimated

## Run

### Demo mode (no backend)

Copy `.env.example` to `.env` (or set `EXPO_PUBLIC_DEMO_MODE=true`):

```bash
cd apps/mobile
npm install
npm start
```

Explore the full app with seeded mock data. Creates, edits, and deletes persist locally via AsyncStorage.

### Real API

Set `EXPO_PUBLIC_DEMO_MODE=false` (or remove it), then:

1. Start PostgreSQL and API — see [`services/api/README.md`](../../services/api/README.md)
2. `npm start` and press `i` / `a`

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
├── demo/          # Demo mode services + AsyncStorage persistence (when EXPO_PUBLIC_DEMO_MODE=true)
├── config/demo.ts # Single feature flag — routes feature APIs to demo or real backend
├── store/         # Zustand (session UI, selected workspace)
├── theme/         # Tokens (#29B5E8 primary)
└── features/items # Metadata → Zod → RHF → field registry (unchanged from R1)
```

## Product identity

Calm operational notebook — not ERP, not dashboard-heavy admin tooling.

Primary color: `#29B5E8`

## Screenshots

Save milestones to [`docs/progress/`](../../docs/progress/README.md).
