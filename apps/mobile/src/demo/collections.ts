import type { Collection } from '@/types';
import { createId } from '@/utils';
import { demoDelay } from './delay';
import { findWorkspace, getDemoData, mutateDemoData } from './state';

export async function demoFetchCollections(workspaceId: string): Promise<Collection[]> {
  await demoDelay();
  return (await getDemoData()).collections.filter((c) => c.workspaceId === workspaceId);
}

export async function demoCreateCollection(
  workspaceId: string,
  payload: { name: string; description?: string; icon?: string },
): Promise<Collection> {
  await demoDelay();
  let created!: Collection;
  const now = new Date().toISOString();

  await mutateDemoData((data) => {
    if (!findWorkspace(data, workspaceId)) {
      throw new Error('Workspace not found');
    }

    created = {
      id: createId('col'),
      workspaceId,
      name: payload.name.trim(),
      description: payload.description?.trim() ?? '',
      emoji: payload.icon ?? '📓',
      itemCount: 0,
      lastActivityAt: now,
    };
    data.collections.push(created);
  });

  return created;
}

export async function demoUpdateCollection(
  workspaceId: string,
  collectionId: string,
  payload: { name?: string; description?: string; icon?: string },
): Promise<Collection> {
  await demoDelay();
  let updated!: Collection;

  await mutateDemoData((data) => {
    const collection = data.collections.find(
      (c) => c.id === collectionId && c.workspaceId === workspaceId,
    );
    if (!collection) throw new Error('Collection not found');

    if (payload.name != null) collection.name = payload.name.trim();
    if (payload.description != null) collection.description = payload.description.trim();
    if (payload.icon != null) collection.emoji = payload.icon;

    updated = { ...collection };
  });

  return updated;
}

export async function demoDeleteCollection(
  workspaceId: string,
  collectionId: string,
): Promise<void> {
  await demoDelay();
  await mutateDemoData((data) => {
    data.collections = data.collections.filter(
      (c) => !(c.id === collectionId && c.workspaceId === workspaceId),
    );
    data.fields = data.fields.filter((f) => f.collectionId !== collectionId);
    data.items = data.items.filter((i) => i.collectionId !== collectionId);
  });
}
