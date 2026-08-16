import { useWorkspaces } from '@/features/workspaces/hooks/useWorkspaces';
import type { WorkspaceRole } from '@/types';

/** Current user's role in a workspace, from the cached workspace list. */
export function useWorkspaceRole(workspaceId: string | undefined): WorkspaceRole | undefined {
  const { data: workspaces } = useWorkspaces();
  if (!workspaceId) {
    return undefined;
  }
  return workspaces?.find((workspace) => workspace.id === workspaceId)?.role;
}
