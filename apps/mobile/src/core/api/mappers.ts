import { ApiCollection, ApiField, ApiRecord, ApiWorkspace } from './types';
import { Collection, Item, ItemData, PropertyField, PropertyType, Workspace } from '@/types';

const WORKSPACE_EMOJIS = ['🏠', '📋', '📦', '🌿', '📝'];

export function mapWorkspace(dto: ApiWorkspace, index = 0): Workspace {
  return {
    id: dto.id,
    name: dto.name,
    description: `/${dto.slug}`,
    emoji: WORKSPACE_EMOJIS[index % WORKSPACE_EMOJIS.length],
  };
}

export function mapCollection(dto: ApiCollection): Collection {
  return {
    id: dto.id,
    workspaceId: dto.workspaceId,
    name: dto.name,
    description: dto.description ?? '',
    emoji: dto.icon ?? '📓',
    itemCount: dto.itemCount,
    lastActivityAt: dto.lastActivityAt ?? dto.updatedAt,
  };
}

export function mapField(dto: ApiField): PropertyField {
  return {
    id: dto.id,
    collectionId: dto.collectionId,
    key: dto.key,
    label: dto.label,
    type: dto.type as PropertyType,
    required: dto.required,
    sortOrder: dto.sortOrder,
    config: dto.config as PropertyField['config'],
  };
}

export function mapRecord(dto: ApiRecord): Item {
  return {
    id: dto.id,
    collectionId: dto.collectionId,
    data: dto.data as ItemData,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}
