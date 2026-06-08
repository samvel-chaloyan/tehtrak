import type { PropertyField, PropertyType } from '@/types';
import { createId, slugifyKey } from '@/utils';
import { demoDelay } from './delay';
import { collectionFields, findCollection, getDemoData, mutateDemoData } from './state';

export async function demoFetchFields(
  workspaceId: string,
  collectionId: string,
): Promise<PropertyField[]> {
  await demoDelay();
  const data = await getDemoData();
  if (!findCollection(data, workspaceId, collectionId)) {
    return [];
  }
  return collectionFields(data, collectionId);
}

export async function demoCreateField(
  workspaceId: string,
  collectionId: string,
  payload: {
    label: string;
    type: PropertyType;
    required: boolean;
    config?: Record<string, unknown>;
    sortOrder: number;
  },
): Promise<PropertyField> {
  await demoDelay();
  let created!: PropertyField;

  await mutateDemoData((data) => {
    if (!findCollection(data, workspaceId, collectionId)) {
      throw new Error('Collection not found');
    }

    const key = slugifyKey(payload.label);
    const existingKeys = new Set(
      collectionFields(data, collectionId).map((f) => f.key),
    );
    let uniqueKey = key;
    let suffix = 1;
    while (existingKeys.has(uniqueKey)) {
      uniqueKey = `${key}_${suffix}`;
      suffix += 1;
    }

    created = {
      id: createId('f'),
      collectionId,
      key: uniqueKey,
      label: payload.label.trim(),
      type: payload.type,
      required: payload.required,
      sortOrder: payload.sortOrder,
      config: payload.config as PropertyField['config'],
    };
    data.fields.push(created);
  });

  return created;
}

export async function demoDeleteField(
  workspaceId: string,
  collectionId: string,
  fieldId: string,
): Promise<void> {
  await demoDelay();
  await mutateDemoData((data) => {
    if (!findCollection(data, workspaceId, collectionId)) {
      throw new Error('Collection not found');
    }
    data.fields = data.fields.filter(
      (f) => !(f.id === fieldId && f.collectionId === collectionId),
    );
  });
}
