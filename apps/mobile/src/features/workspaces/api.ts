import { apiDelete, apiGet, apiPatch, apiPost } from '@/core/api';
import { mapWorkspace } from '@/core/api/mappers';
import type { ApiWorkspace } from '@/core/api/types';
import { isDemoMode } from '@/config/demo';
import { logDemo } from '@/config/demoDebug';
import {
  demoCreateWorkspace,
  demoDeleteWorkspace,
  demoFetchWorkspaces,
  demoFetchWorkspaceSummaries,
  demoUpdateWorkspace,
} from '@/demo/workspaces';
import { fetchCollections } from '@/features/collections/api';
import type { WorkspaceSummary } from '@/types';

export async function fetchWorkspaces() {
  if (isDemoMode) {
    logDemo('fetchWorkspaces bypassed API');
    return demoFetchWorkspaces();
  }

  const list = await apiGet<ApiWorkspace[]>('/workspaces');
  return list.map((w, i) => mapWorkspace(w, i));
}

export async function createWorkspace(payload: { name: string; description?: string }) {
  if (isDemoMode) {
    return demoCreateWorkspace(payload);
  }

  const dto = await apiPost<ApiWorkspace>('/workspaces', payload);
  return mapWorkspace(dto);
}

export async function updateWorkspace(
  id: string,
  payload: { name?: string; description?: string },
) {
  if (isDemoMode) {
    return demoUpdateWorkspace(id, payload);
  }

  const dto = await apiPatch<ApiWorkspace>(`/workspaces/${id}`, payload);
  return mapWorkspace(dto);
}

export async function deleteWorkspace(id: string) {
  if (isDemoMode) {
    return demoDeleteWorkspace(id);
  }

  await apiDelete(`/workspaces/${id}`);
}

export async function fetchWorkspaceSummaries() {
  if (isDemoMode) {
    logDemo('fetchWorkspaceSummaries bypassed API');
    return demoFetchWorkspaceSummaries();
  }

  /**
   * API mode: one collections request per workspace until a summaries endpoint exists.
   * Demo mode uses a single local read (`demoFetchWorkspaceSummaries`).
   */
  const list = await apiGet<ApiWorkspace[]>('/workspaces');
  const summaries: Record<string, WorkspaceSummary> = {};

  await Promise.all(
    list.map(async (workspace) => {
      const collections = await fetchCollections(workspace.id);
      const lastActivityAt = collections.reduce<string | undefined>((latest, collection) => {
        if (!collection.lastActivityAt) {
          return latest;
        }
        if (!latest || collection.lastActivityAt > latest) {
          return collection.lastActivityAt;
        }
        return latest;
      }, undefined);

      summaries[workspace.id] = {
        collectionCount: collections.length,
        lastActivityAt,
      };
    }),
  );

  return summaries;
}
