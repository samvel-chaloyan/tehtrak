import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/core/api';
import { removePinsForCollection } from '@/features/pins/hooks/usePins';
import {
  createCollection,
  deleteCollection,
  fetchCollections,
  updateCollection,
} from '../api';

export function useCollections(workspaceId: string) {
  return useQuery({
    queryKey: queryKeys.collections(workspaceId),
    queryFn: () => fetchCollections(workspaceId),
    enabled: Boolean(workspaceId),
  });
}

export function useCreateCollection(workspaceId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { name: string; description?: string; icon?: string }) =>
      createCollection(workspaceId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.collections(workspaceId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.workspaceSummaries });
      queryClient.invalidateQueries({ queryKey: queryKeys.pinCatalog });
    },
  });
}

export function useUpdateCollection(workspaceId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      collectionId,
      ...payload
    }: {
      collectionId: string;
      name?: string;
      description?: string;
    }) => updateCollection(workspaceId, collectionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.collections(workspaceId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.workspaceSummaries });
      queryClient.invalidateQueries({ queryKey: queryKeys.pinCatalog });
    },
  });
}

export function useDeleteCollection(workspaceId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (collectionId: string) => deleteCollection(workspaceId, collectionId),
    onSuccess: (_result, collectionId) => {
      removePinsForCollection(workspaceId, collectionId);
      queryClient.invalidateQueries({ queryKey: queryKeys.collections(workspaceId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.workspaceSummaries });
      queryClient.invalidateQueries({ queryKey: queryKeys.pinCatalog });
    },
  });
}
