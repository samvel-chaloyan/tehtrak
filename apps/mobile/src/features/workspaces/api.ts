import { apiDelete, apiGet, apiPatch, apiPost } from '@/core/api';
import { mapWorkspace } from '@/core/api/mappers';
import type { ApiWorkspace } from '@/core/api/types';

export async function fetchWorkspaces() {
  const list = await apiGet<ApiWorkspace[]>('/workspaces');
  return list.map((w, i) => mapWorkspace(w, i));
}

export async function createWorkspace(name: string) {
  const dto = await apiPost<ApiWorkspace>('/workspaces', { name });
  return mapWorkspace(dto);
}

export async function updateWorkspace(id: string, name: string) {
  const dto = await apiPatch<ApiWorkspace>(`/workspaces/${id}`, { name });
  return mapWorkspace(dto);
}

export async function deleteWorkspace(id: string) {
  await apiDelete(`/workspaces/${id}`);
}
