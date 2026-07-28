import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/core/api';

import { fetchWorkspaceSummaries } from '../api';
import type { WorkspaceSummary } from '@/types';

export function useWorkspaceSummaries(enabled = true) {
  return useQuery<Record<string, WorkspaceSummary>>({
    queryKey: queryKeys.workspaceSummaries,
    queryFn: fetchWorkspaceSummaries,
    enabled,
  });
}
