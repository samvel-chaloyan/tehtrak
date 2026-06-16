# State Management

> **Documentation layer:** Implementation. Not part of the design hierarchy. Index: [README.md](./README.md).

## Division of responsibility

| Concern | Tool | Example |
|---------|------|---------|
| Server data | TanStack Query | collections, records, user |
| Auth session | Zustand | tokens (refs only), isAuthenticated |
| Active workspace | Zustand | activeWorkspaceId |
| UI preferences | Zustand + MMKV persist | theme, fontScale |
| Form state | React Hook Form | record create/edit |
| Offline queue | SQLite service | sync operations |

## Zustand stores

### `useAuthStore`

```typescript
interface AuthState {
  isAuthenticated: boolean;
  isRestoring: boolean;
  user: User | null;
  setSession: (user: User) => void;
  clearSession: () => void;
}
```

Tokens live in secure storage, not Zustand state.

### `useWorkspaceStore`

```typescript
interface WorkspaceState {
  activeWorkspaceId: string | null;
  setActiveWorkspace: (id: string) => void;
}
```

## TanStack Query

### Query key factory

```typescript
export const queryKeys = {
  workspaces: ['workspaces'] as const,
  workspace: (id: string) => ['workspaces', id] as const,
  collections: (workspaceId: string) => ['collections', workspaceId] as const,
  collection: (workspaceId: string, id: string) =>
    ['collections', workspaceId, id] as const,
  records: (workspaceId: string, collectionId: string) =>
    ['records', workspaceId, collectionId] as const,
  record: (workspaceId: string, collectionId: string, id: string) =>
    ['records', workspaceId, collectionId, id] as const,
};
```

### Defaults

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      retry: 2,
    },
  },
});
```

### Offline integration

- `networkMode: 'offlineFirst'` where appropriate
- On mutation: write SQLite → optimistic `setQueryData` → enqueue sync
- On sync success: invalidate or merge server response

## Mutations pattern

```typescript
export function useCreateRecord(workspaceId: string, collectionId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RecordData) =>
      createRecord(workspaceId, collectionId, data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.records(...) });
      // optimistic update + sqlite
    },
    onError: (_err, _data, context) => {
      // rollback from context
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.records(...) });
    },
  });
}
```

## Rules

1. Single source of truth for server entities: Query cache
2. Do not copy full record lists into Zustand
3. Persist only user preferences and last active workspace id (MMKV)
4. Clear Query cache on logout
