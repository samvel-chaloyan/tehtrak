import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/core/api';
import { ItemData } from '@/types';
import { createRecord, fetchRecord, fetchRecords } from '../api';

export function useRecords(workspaceId: string, collectionId: string) {
  return useQuery({
    queryKey: queryKeys.records(workspaceId, collectionId),
    queryFn: () => fetchRecords(workspaceId, collectionId),
    enabled: Boolean(workspaceId && collectionId),
  });
}

export function useRecord(workspaceId: string, collectionId: string, recordId: string) {
  return useQuery({
    queryKey: queryKeys.record(workspaceId, collectionId, recordId),
    queryFn: () => fetchRecord(workspaceId, collectionId, recordId),
    enabled: Boolean(workspaceId && collectionId && recordId),
  });
}

export function useCreateRecord(workspaceId: string, collectionId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ItemData) => createRecord(workspaceId, collectionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.records(workspaceId, collectionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.collections(workspaceId) });
    },
  });
}
