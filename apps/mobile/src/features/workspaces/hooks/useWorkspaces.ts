import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/core/api';
import { createWorkspace, fetchWorkspaces } from '../api';

export function useWorkspaces() {
  return useQuery({
    queryKey: queryKeys.workspaces,
    queryFn: fetchWorkspaces,
  });
}

export function useCreateWorkspace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => createWorkspace(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.workspaces });
    },
  });
}
