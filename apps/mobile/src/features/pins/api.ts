import { isDemoMode } from '@/config/demo';
import { getDemoData } from '@/demo/state';
import { fetchCollections } from '@/features/collections/api';
import { fetchFields } from '@/features/properties/api';
import { fetchRecords } from '@/features/items/api';
import { fetchWorkspaces } from '@/features/workspaces/api';
import type { Collection, Item, PropertyField, Workspace } from '@/types';

export interface PinCatalog {
  workspaces: Workspace[];
  collections: Collection[];
  items: Item[];
  fieldsByCollection: Record<string, PropertyField[]>;
}

/**
 * Catalog for resolving pin titles and navigation.
 * Demo: single local read. API: fan-out (fine for pin counts).
 */
export async function fetchPinCatalog(): Promise<PinCatalog> {
  if (isDemoMode) {
    const data = await getDemoData();
    const fieldsByCollection: Record<string, PropertyField[]> = {};
    for (const field of data.fields) {
      const list = fieldsByCollection[field.collectionId] ?? [];
      list.push(field);
      fieldsByCollection[field.collectionId] = list;
    }
    return {
      workspaces: data.workspaces,
      collections: data.collections,
      items: data.items,
      fieldsByCollection,
    };
  }

  const workspaces = await fetchWorkspaces();
  const collectionLists = await Promise.all(
    workspaces.map((workspace) => fetchCollections(workspace.id)),
  );
  const collections = collectionLists.flat();

  const fieldsByCollection: Record<string, PropertyField[]> = {};
  const itemLists = await Promise.all(
    collections.map(async (collection) => {
      const [fields, items] = await Promise.all([
        fetchFields(collection.workspaceId, collection.id),
        fetchRecords(collection.workspaceId, collection.id),
      ]);
      fieldsByCollection[collection.id] = fields;
      return items;
    }),
  );

  return {
    workspaces,
    collections,
    items: itemLists.flat(),
    fieldsByCollection,
  };
}
