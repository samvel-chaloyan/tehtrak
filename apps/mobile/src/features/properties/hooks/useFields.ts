import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/core/api';
import { PropertyType } from '@/types';
import { createField, deleteField, fetchFields, updateField } from '../api';

export function useFields(workspaceId: string, collectionId: string) {
  return useQuery({
    queryKey: queryKeys.fields(workspaceId, collectionId),
    queryFn: () => fetchFields(workspaceId, collectionId),
    enabled: Boolean(workspaceId && collectionId),
  });
}

export function useCreateField(workspaceId: string, collectionId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      label: string;
      type: PropertyType;
      required: boolean;
      config?: Record<string, unknown>;
      sortOrder: number;
    }) => createField(workspaceId, collectionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.fields(workspaceId, collectionId) });
    },
  });
}

export function useUpdateField(workspaceId: string, collectionId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      fieldId,
      ...payload
    }: {
      fieldId: string;
      label?: string;
      required?: boolean;
      sortOrder?: number;
      config?: Record<string, unknown>;
    }) => updateField(workspaceId, collectionId, fieldId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.fields(workspaceId, collectionId) });
    },
  });
}

export function useDeleteField(workspaceId: string, collectionId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (fieldId: string) => deleteField(workspaceId, collectionId, fieldId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.fields(workspaceId, collectionId) });
    },
  });
}
