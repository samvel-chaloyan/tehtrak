import { apiDelete, apiGet, apiPost } from '@/core/api';
import { mapField } from '@/core/api/mappers';
import type { ApiField } from '@/core/api/types';
import { isDemoMode } from '@/config/demo';
import { logDemo } from '@/config/demoDebug';
import { demoCreateField, demoDeleteField, demoFetchFields } from '@/demo/fields';
import { PropertyType } from '@/types';
import { slugifyKey } from '@/utils';

export async function fetchFields(workspaceId: string, collectionId: string) {
  if (isDemoMode) {
    logDemo('fetchFields bypassed API');
    return demoFetchFields(workspaceId, collectionId);
  }

  const list = await apiGet<ApiField[]>(
    `/workspaces/${workspaceId}/collections/${collectionId}/fields`,
  );
  return list.map(mapField).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function createField(
  workspaceId: string,
  collectionId: string,
  payload: {
    label: string;
    type: PropertyType;
    required: boolean;
    config?: Record<string, unknown>;
    sortOrder: number;
  },
) {
  if (isDemoMode) {
    return demoCreateField(workspaceId, collectionId, payload);
  }

  const key = slugifyKey(payload.label);
  const dto = await apiPost<ApiField>(
    `/workspaces/${workspaceId}/collections/${collectionId}/fields`,
    {
      key,
      label: payload.label,
      type: payload.type,
      required: payload.required,
      config: payload.config ?? {},
      sortOrder: payload.sortOrder,
    },
  );
  return mapField(dto);
}

export async function deleteField(workspaceId: string, collectionId: string, fieldId: string) {
  if (isDemoMode) {
    return demoDeleteField(workspaceId, collectionId, fieldId);
  }

  await apiDelete(
    `/workspaces/${workspaceId}/collections/${collectionId}/fields/${fieldId}`,
  );
}
