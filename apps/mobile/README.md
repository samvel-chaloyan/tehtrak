# Tehtrak Mobile

Phase **R1** — frontend foundation with mocked local data only.

## Stack

- Expo + React Native + TypeScript
- React Navigation
- Zustand + MMKV
- React Hook Form + Zod
- FlashList + Reanimated

## Run

```bash
cd apps/mobile
npm install
npm start
```

Press `i` for iOS simulator or `a` for Android.

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
├── store/         # Zustand (workspace selection, mock mutations)
├── theme/         # Tokens (#29B5E8 primary)
├── mocks/         # Operational mock data
└── features/items # Metadata → Zod → RHF → field registry
```

## Product identity

Calm operational notebook — not ERP, not dashboard-heavy admin tooling.

Primary color: `#29B5E8`

## Screenshots

Save milestones to [`docs/progress/`](../../docs/progress/README.md).
