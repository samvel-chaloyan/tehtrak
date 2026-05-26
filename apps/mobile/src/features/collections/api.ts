import { apiDelete, apiGet, apiPatch, apiPost } from '@/core/api';
import { mapCollection } from '@/core/api/mappers';
import type { ApiCollection } from '@/core/api/types';

export async function fetchCollections(workspaceId: string) {
  const list = await apiGet<ApiCollection[]>(`/workspaces/${workspaceId}/collections`);
  return list.map(mapCollection);
}

export async function createCollection(
  workspaceId: string,
  payload: { name: string; description?: string; icon?: string },
) {
  const dto = await apiPost<ApiCollection>(`/workspaces/${workspaceId}/collections`, payload);
  return mapCollection(dto);
}

export async function updateCollection(
  workspaceId: string,
  collectionId: string,
  payload: { name?: string; description?: string; icon?: string },
) {
  const dto = await apiPatch<ApiCollection>(
    `/workspaces/${workspaceId}/collections/${collectionId}`,
    payload,
  );
  return mapCollection(dto);
}

export async function deleteCollection(workspaceId: string, collectionId: string) {
  await apiDelete(`/workspaces/${workspaceId}/collections/${collectionId}`);
}
