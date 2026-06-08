import { apiDelete, apiGet, apiPatch, apiPost } from '@/core/api';
import { mapWorkspace } from '@/core/api/mappers';
import type { ApiWorkspace } from '@/core/api/types';
import { isDemoMode } from '@/config/demo';
import { logDemo } from '@/config/demoDebug';
import {
  demoCreateWorkspace,
  demoDeleteWorkspace,
  demoFetchWorkspaces,
  demoUpdateWorkspace,
} from '@/demo/workspaces';

export async function fetchWorkspaces() {
  if (isDemoMode) {
    logDemo('fetchWorkspaces bypassed API');
    return demoFetchWorkspaces();
  }

  const list = await apiGet<ApiWorkspace[]>('/workspaces');
  return list.map((w, i) => mapWorkspace(w, i));
}

export async function createWorkspace(name: string) {
  if (isDemoMode) {
    return demoCreateWorkspace(name);
  }

  const dto = await apiPost<ApiWorkspace>('/workspaces', { name });
  return mapWorkspace(dto);
}

export async function updateWorkspace(id: string, name: string) {
  if (isDemoMode) {
    return demoUpdateWorkspace(id, name);
  }

  const dto = await apiPatch<ApiWorkspace>(`/workspaces/${id}`, { name });
  return mapWorkspace(dto);
}

export async function deleteWorkspace(id: string) {
  if (isDemoMode) {
    return demoDeleteWorkspace(id);
  }

  await apiDelete(`/workspaces/${id}`);
}
