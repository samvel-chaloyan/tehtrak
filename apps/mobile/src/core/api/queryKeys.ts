export const queryKeys = {
  me: ['auth', 'me'] as const,
  workspaces: ['workspaces'] as const,
  collections: (workspaceId: string) => ['collections', workspaceId] as const,
  fields: (workspaceId: string, collectionId: string) =>
    ['fields', workspaceId, collectionId] as const,
  records: (workspaceId: string, collectionId: string) =>
    ['records', workspaceId, collectionId] as const,
  record: (workspaceId: string, collectionId: string, recordId: string) =>
    ['record', workspaceId, collectionId, recordId] as const,
};
