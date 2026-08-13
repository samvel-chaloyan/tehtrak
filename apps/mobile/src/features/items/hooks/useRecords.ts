import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/core/api';
import { removePinsForItem } from '@/features/pins/hooks/usePins';
import { ItemData } from '@/types';
import { createRecord, deleteRecord, fetchRecord, fetchRecords, updateRecord } from '../api';

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
      queryClient.invalidateQueries({ queryKey: queryKeys.workspaceSummaries });
      queryClient.invalidateQueries({ queryKey: queryKeys.pinCatalog });
    },
  });
}

export function useUpdateRecord(workspaceId: string, collectionId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ recordId, data }: { recordId: string; data: ItemData }) =>
      updateRecord(workspaceId, collectionId, recordId, data),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.records(workspaceId, collectionId) });
      queryClient.invalidateQueries({
        queryKey: queryKeys.record(workspaceId, collectionId, variables.recordId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.collections(workspaceId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.workspaceSummaries });
      queryClient.invalidateQueries({ queryKey: queryKeys.pinCatalog });
    },
  });
}

export function useDeleteRecord(workspaceId: string, collectionId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (recordId: string) => deleteRecord(workspaceId, collectionId, recordId),
    onSuccess: (_result, recordId) => {
      removePinsForItem(workspaceId, collectionId, recordId);
      queryClient.invalidateQueries({ queryKey: queryKeys.records(workspaceId, collectionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.collections(workspaceId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.workspaceSummaries });
      queryClient.invalidateQueries({ queryKey: queryKeys.pinCatalog });
    },
  });
}
