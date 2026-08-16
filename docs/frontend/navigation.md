# Navigation

> **Documentation layer:** Implementation. For screen layout and action placement see [screen-patterns.md](./screen-patterns.md). Index: [README.md](./README.md).

## Library

React Navigation v6+ (native stack + bottom tabs).

## Structure

```
RootNavigator
├── AuthStack (unauthenticated)
│   ├── WelcomeScreen
│   ├── LoginScreen
│   └── RegisterScreen
└── AppStack (authenticated)
    ├── WorkspaceList
    ├── GlobalSearch          ← drawer Search (cached mixed results)
    ├── QuickAccess
    ├── CollectionList / Details / Items…
    └── Settings
    └── Modals
        ├── CollectionFormModal (create/edit collection)
        ├── FieldEditorModal
        └── AttachmentViewerModal
```

## Active workspace

- Stored in Zustand `useWorkspaceStore.activeWorkspaceId`
- Switching workspace resets Collections stack
- Deep links include `workspaceId`

## Navigation params (typed)

```typescript
type CollectionsStackParamList = {
  CollectionList: { workspaceId: string };
  RecordList: { workspaceId: string; collectionId: string };
  RecordForm: {
    workspaceId: string;
    collectionId: string;
    recordId?: string; // undefined = create
  };
};
```

## UX patterns

- **Bottom tabs** for primary areas (max 4 tabs)
- **FAB** on RecordList for quick add (bottom-right, thumb reach)
- **Modals** for short forms (collection rename)
- **Full screen** for record create/edit (keyboard-heavy)
- **Swipe back** enabled on iOS; hardware back on Android

## Auth gate

```typescript
// app/RootNavigator.tsx
const { isAuthenticated, isRestoring } = useAuthStore();

if (isRestoring) return <SplashScreen />;
return isAuthenticated ? <AppStack /> : <AuthStack />;
```

## Deep linking (Phase 2)

```
matian://workspace/:workspaceId/collection/:collectionId/record/:recordId
```

MVP: no universal links required.
