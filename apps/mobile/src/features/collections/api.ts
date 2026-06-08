import { apiDelete, apiGet, apiPatch, apiPost } from '@/core/api';
import { mapCollection } from '@/core/api/mappers';
import type { ApiCollection } from '@/core/api/types';
import { isDemoMode } from '@/config/demo';
import { logDemo } from '@/config/demoDebug';
import {
  demoCreateCollection,
  demoDeleteCollection,
  demoFetchCollections,
  demoUpdateCollection,
} from '@/demo/collections';

export async function fetchCollections(workspaceId: string) {
  if (isDemoMode) {
    logDemo('fetchCollections bypassed API');
    return demoFetchCollections(workspaceId);
  }

  const list = await apiGet<ApiCollection[]>(`/workspaces/${workspaceId}/collections`);
  return list.map(mapCollection);
}

export async function createCollection(
  workspaceId: string,
  payload: { name: string; description?: string; icon?: string },
) {
  if (isDemoMode) {
    return demoCreateCollection(workspaceId, payload);
  }

  const dto = await apiPost<ApiCollection>(`/workspaces/${workspaceId}/collections`, payload);
  return mapCollection(dto);
}

export async function updateCollection(
  workspaceId: string,
  collectionId: string,
  payload: { name?: string; description?: string; icon?: string },
) {
  if (isDemoMode) {
    return demoUpdateCollection(workspaceId, collectionId, payload);
  }

  const dto = await apiPatch<ApiCollection>(
    `/workspaces/${workspaceId}/collections/${collectionId}`,
    payload,
  );
  return mapCollection(dto);
}

export async function deleteCollection(workspaceId: string, collectionId: string) {
  if (isDemoMode) {
    return demoDeleteCollection(workspaceId, collectionId);
  }

  await apiDelete(`/workspaces/${workspaceId}/collections/${collectionId}`);
}
