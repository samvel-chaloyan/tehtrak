import type { Workspace, WorkspaceSummary } from '@/types';

export const MOST_USED_WORKSPACE_COUNT = 3;

function activityTime(
  workspaceId: string,
  summaries?: Record<string, WorkspaceSummary>,
): number {
  const iso = summaries?.[workspaceId]?.lastActivityAt;
  if (!iso) {
    return 0;
  }
  const time = Date.parse(iso);
  return Number.isNaN(time) ? 0 : time;
}

/** All places, newest activity first. Stable by name when tied. */
export function sortWorkspacesByLastEdited(
  workspaces: Workspace[],
  summaries?: Record<string, WorkspaceSummary>,
): Workspace[] {
  return [...workspaces].sort((a, b) => {
    const diff = activityTime(b.id, summaries) - activityTime(a.id, summaries);
    if (diff !== 0) {
      return diff;
    }
    return a.name.localeCompare(b.name);
  });
}

/** Top shortcuts for the Most used chip row. */
export function mostUsedWorkspaces(
  workspaces: Workspace[],
  summaries?: Record<string, WorkspaceSummary>,
  limit = MOST_USED_WORKSPACE_COUNT,
): Workspace[] {
  return sortWorkspacesByLastEdited(workspaces, summaries).slice(0, limit);
}
