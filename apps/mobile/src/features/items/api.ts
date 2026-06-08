import { apiDelete, apiGet, apiGetWithMeta, apiPatch, apiPost } from '@/core/api';
import { mapRecord } from '@/core/api/mappers';
import type { ApiRecord } from '@/core/api/types';
import { isDemoMode } from '@/config/demo';
import { logDemo } from '@/config/demoDebug';
import {
  demoCreateRecord,
  demoDeleteRecord,
  demoFetchRecord,
  demoFetchRecords,
  demoUpdateRecord,
} from '@/demo/records';
import { ItemData } from '@/types';

export async function fetchRecords(workspaceId: string, collectionId: string) {
  if (isDemoMode) {
    logDemo('fetchRecords bypassed API');
    return demoFetchRecords(workspaceId, collectionId);
  }

  const { data } = await apiGetWithMeta<ApiRecord[]>(
    `/workspaces/${workspaceId}/collections/${collectionId}/records`,
    { limit: 100 },
  );
  return data.map(mapRecord);
}

export async function fetchRecord(
  workspaceId: string,
  collectionId: string,
  recordId: string,
) {
  if (isDemoMode) {
    return demoFetchRecord(workspaceId, collectionId, recordId);
  }

  const dto = await apiGet<ApiRecord>(
    `/workspaces/${workspaceId}/collections/${collectionId}/records/${recordId}`,
  );
  return mapRecord(dto);
}

export async function createRecord(
  workspaceId: string,
  collectionId: string,
  data: ItemData,
) {
  if (isDemoMode) {
    return demoCreateRecord(workspaceId, collectionId, data);
  }

  const dto = await apiPost<ApiRecord>(
    `/workspaces/${workspaceId}/collections/${collectionId}/records`,
    { data },
  );
  return mapRecord(dto);
}

export async function updateRecord(
  workspaceId: string,
  collectionId: string,
  recordId: string,
  data: ItemData,
) {
  if (isDemoMode) {
    return demoUpdateRecord(workspaceId, collectionId, recordId, data);
  }

  const dto = await apiPatch<ApiRecord>(
    `/workspaces/${workspaceId}/collections/${collectionId}/records/${recordId}`,
    { data },
  );
  return mapRecord(dto);
}

export async function deleteRecord(
  workspaceId: string,
  collectionId: string,
  recordId: string,
) {
  if (isDemoMode) {
    return demoDeleteRecord(workspaceId, collectionId, recordId);
  }

  await apiDelete(
    `/workspaces/${workspaceId}/collections/${collectionId}/records/${recordId}`,
  );
}
