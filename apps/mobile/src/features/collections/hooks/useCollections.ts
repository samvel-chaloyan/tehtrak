import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/core/api';
import { createCollection, fetchCollections } from '../api';

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
    },
  });
}
