# Frontend Architecture

## Folder structure

```
src/
├── app/              # Navigation, providers, root layout
├── core/             # API client, config, constants, types
├── features/         # Feature modules (vertical slices)
├── shared/           # Reusable UI, hooks, utils
├── services/         # Sync, storage, analytics
├── store/            # Global Zustand stores
├── theme/            # Design tokens, typography, spacing
├── config/           # Environment, feature flags
└── assets/           # Images, fonts
```

## Feature module structure

Each feature follows the same layout:

```
features/{name}/
├── api/              # API calls + query keys
├── hooks/            # Feature hooks
├── components/       # Feature-specific UI
├── screens/          # Screen components
├── store/            # Feature-local Zustand (if needed)
├── validation/       # Zod schemas (often generated from field metadata)
└── types/            # TypeScript types
```

## Layer responsibilities

| Layer | Responsibility |
|-------|----------------|
| `app/` | Navigation trees, auth gate, theme provider |
| `features/` | Business UI and logic for one domain area |
| `shared/` | Buttons, inputs, layout primitives — no domain logic |
| `services/` | Cross-cutting: sync engine, SQLite, file upload |
| `core/` | Axios instance, interceptors, shared API types |
| `store/` | Auth session, active workspace, UI preferences |

## State management rules

1. **Server state** → TanStack Query (collections, records, user)
2. **Global client state** → Zustand (auth, active workspace, theme)
3. **Feature-local UI state** → `useState` or feature Zustand slice
4. **Offline queue** → SQLite via `services/sync` — not Zustand
5. **Never** duplicate server data in Zustand long-term

## Data flow

```
Screen → hook (useQuery / useMutation) → api/ → Axios → Backend
                    ↓
              Optimistic update + SQLite write (offline)
                    ↓
              Sync queue when offline
```

## Dynamic UI engine

Screens for records are **not** hand-coded per collection. They render from `Field[]` metadata.

See [form-engine.md](../frontend/form-engine.md).

## Key libraries

| Purpose | Library |
|---------|---------|
| Navigation | React Navigation |
| Server state | TanStack Query |
| Client state | Zustand |
| Forms | React Hook Form |
| Validation | Zod |
| Lists | FlashList |
| Animations | Reanimated |
| Preferences | MMKV |
| Local DB | SQLite |

## Naming conventions

| Item | Convention | Example |
|------|------------|---------|
| Screens | `{Feature}{Action}Screen` | `CollectionListScreen` |
| Hooks | `use{Feature}{Action}` | `useCollections` |
| API functions | `{verb}{Resource}` | `getCollections` |
| Query keys | `['resource', ...params]` | `['collections', workspaceId]` |
| Components | PascalCase | `RecordCard` |

## Anti-patterns

- Hardcoded forms per collection type
- Fetching in components (use hooks)
- Business logic in `shared/` components
- Storing API responses only in Zustand without Query cache
