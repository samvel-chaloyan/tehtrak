import { apiDelete, apiGet, apiGetWithMeta, apiPatch, apiPost } from '@/core/api';
import { mapRecord } from '@/core/api/mappers';
import type { ApiRecord, PaginationMeta } from '@/core/api/types';
import { ItemData } from '@/types';

export async function fetchRecords(workspaceId: string, collectionId: string) {
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
  await apiDelete(
    `/workspaces/${workspaceId}/collections/${collectionId}/records/${recordId}`,
  );
}
