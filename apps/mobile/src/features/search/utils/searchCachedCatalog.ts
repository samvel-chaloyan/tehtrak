import type { QueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/core/api';
import type { Collection, Item, PropertyField, Workspace } from '@/types';
import { getItemSubtitle, getItemTitle } from '@/utils';

export type GlobalSearchHitKind = 'workspace' | 'collection' | 'item';

export interface GlobalSearchHit {
  kind: GlobalSearchHitKind;
  id: string;
  title: string;
  /** Quiet secondary line (description, workspace name, etc.). */
  meta?: string;
  workspaceId: string;
  workspaceName: string;
  collectionId?: string;
  collectionName?: string;
  itemId?: string;
}

export interface GlobalSearchResults {
  workspaces: GlobalSearchHit[];
  collections: GlobalSearchHit[];
  items: GlobalSearchHit[];
  total: number;
}

const MAX_PER_GROUP = 20;

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function includesQuery(haystack: string | undefined | null, query: string) {
  if (!haystack) {
    return false;
  }
  return normalize(haystack).includes(query);
}

function itemBlobMatches(item: Item, query: string) {
  return Object.values(item.data).some((value) => {
    if (value == null || value === '') {
      return false;
    }
    return String(value).toLowerCase().includes(query);
  });
}

/**
 * Search already-fetched TanStack Query cache only — no network.
 * Covers loaded workspaces, collections, and items (plus fields for titles).
 */
export function searchCachedCatalog(
  queryClient: QueryClient,
  rawQuery: string,
): GlobalSearchResults {
  const query = normalize(rawQuery);
  const empty: GlobalSearchResults = {
    workspaces: [],
    collections: [],
    items: [],
    total: 0,
  };

  if (!query) {
    return empty;
  }

  const workspaces = queryClient.getQueryData<Workspace[]>(queryKeys.workspaces) ?? [];
  const workspaceById = new Map(workspaces.map((workspace) => [workspace.id, workspace]));

  const workspaceHits: GlobalSearchHit[] = [];
  for (const workspace of workspaces) {
    if (
      includesQuery(workspace.name, query) ||
      includesQuery(workspace.description, query)
    ) {
      workspaceHits.push({
        kind: 'workspace',
        id: workspace.id,
        title: workspace.name,
        meta: workspace.description.trim() || undefined,
        workspaceId: workspace.id,
        workspaceName: workspace.name,
      });
      if (workspaceHits.length >= MAX_PER_GROUP) {
        break;
      }
    }
  }

  const collectionHits: GlobalSearchHit[] = [];
  const collectionNameById = new Map<string, string>();

  for (const [key, data] of queryClient.getQueriesData<Collection[]>({
    queryKey: ['collections'],
  })) {
    if (!Array.isArray(data)) {
      continue;
    }
    const workspaceId = typeof key[1] === 'string' ? key[1] : '';
    const workspaceName = workspaceById.get(workspaceId)?.name ?? 'Workspace';

    for (const collection of data) {
      collectionNameById.set(collection.id, collection.name);
      if (collectionHits.length >= MAX_PER_GROUP) {
        continue;
      }
      if (
        includesQuery(collection.name, query) ||
        includesQuery(collection.description, query)
      ) {
        collectionHits.push({
          kind: 'collection',
          id: collection.id,
          title: collection.name,
          meta: workspaceName,
          workspaceId: collection.workspaceId || workspaceId,
          workspaceName,
          collectionId: collection.id,
          collectionName: collection.name,
        });
      }
    }
  }

  const itemHits: GlobalSearchHit[] = [];

  for (const [key, data] of queryClient.getQueriesData<Item[]>({
    queryKey: ['records'],
  })) {
    if (!Array.isArray(data) || itemHits.length >= MAX_PER_GROUP) {
      continue;
    }
    const workspaceId = typeof key[1] === 'string' ? key[1] : '';
    const collectionId = typeof key[2] === 'string' ? key[2] : '';
    if (!workspaceId || !collectionId) {
      continue;
    }

    const workspaceName = workspaceById.get(workspaceId)?.name ?? 'Workspace';
    const collectionName =
      collectionNameById.get(collectionId) ??
      queryClient
        .getQueryData<Collection[]>(queryKeys.collections(workspaceId))
        ?.find((collection) => collection.id === collectionId)?.name ??
      'Collection';
    const fields =
      queryClient.getQueryData<PropertyField[]>(
        queryKeys.fields(workspaceId, collectionId),
      ) ?? [];

    for (const item of data) {
      if (itemHits.length >= MAX_PER_GROUP) {
        break;
      }
      const title = getItemTitle(item, fields);
      const subtitle = getItemSubtitle(item, fields);
      if (
        includesQuery(title, query) ||
        includesQuery(subtitle, query) ||
        itemBlobMatches(item, query)
      ) {
        itemHits.push({
          kind: 'item',
          id: item.id,
          title,
          meta: [collectionName, workspaceName].filter(Boolean).join(' · '),
          workspaceId,
          workspaceName,
          collectionId,
          collectionName,
          itemId: item.id,
        });
      }
    }
  }

  return {
    workspaces: workspaceHits,
    collections: collectionHits,
    items: itemHits,
    total: workspaceHits.length + collectionHits.length + itemHits.length,
  };
}
