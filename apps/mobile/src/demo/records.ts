import type { Item, ItemData } from '@/types';
import { createId } from '@/utils';
import { demoDelay } from './delay';
import {
  collectionItems,
  findCollection,
  findItem,
  getDemoData,
  mutateDemoData,
  syncCollectionStats,
} from './state';

export async function demoFetchRecords(workspaceId: string, collectionId: string): Promise<Item[]> {
  await demoDelay();
  const data = await getDemoData();
  if (!findCollection(data, workspaceId, collectionId)) {
    return [];
  }
  return collectionItems(data, collectionId);
}

export async function demoFetchRecord(
  workspaceId: string,
  collectionId: string,
  recordId: string,
): Promise<Item> {
  await demoDelay();
  const data = await getDemoData();
  if (!findCollection(data, workspaceId, collectionId)) {
    throw new Error('Collection not found');
  }
  const item = findItem(data, collectionId, recordId);
  if (!item) throw new Error('Item not found');
  return { ...item };
}

export async function demoCreateRecord(
  workspaceId: string,
  collectionId: string,
  itemData: ItemData,
): Promise<Item> {
  await demoDelay();
  let created!: Item;
  const now = new Date().toISOString();

  await mutateDemoData((data) => {
    if (!findCollection(data, workspaceId, collectionId)) {
      throw new Error('Collection not found');
    }

    created = {
      id: createId('item'),
      collectionId,
      data: { ...itemData },
      createdAt: now,
      updatedAt: now,
    };
    data.items.push(created);
    syncCollectionStats(data, collectionId);
  });

  return created;
}

export async function demoUpdateRecord(
  workspaceId: string,
  collectionId: string,
  recordId: string,
  itemData: ItemData,
): Promise<Item> {
  await demoDelay();
  let updated!: Item;
  const now = new Date().toISOString();

  await mutateDemoData((data) => {
    if (!findCollection(data, workspaceId, collectionId)) {
      throw new Error('Collection not found');
    }
    const item = findItem(data, collectionId, recordId);
    if (!item) throw new Error('Item not found');

    item.data = { ...item.data, ...itemData };
    item.updatedAt = now;
    updated = { ...item };
    syncCollectionStats(data, collectionId);
  });

  return updated;
}

export async function demoDeleteRecord(
  workspaceId: string,
  collectionId: string,
  recordId: string,
): Promise<void> {
  await demoDelay();
  await mutateDemoData((data) => {
    if (!findCollection(data, workspaceId, collectionId)) {
      throw new Error('Collection not found');
    }
    data.items = data.items.filter(
      (i) => !(i.id === recordId && i.collectionId === collectionId),
    );
    syncCollectionStats(data, collectionId);
  });
}
