import type { ApiUser } from '@/core/api/types';
import { logDemo } from '@/config/demoDebug';
import {
  mockCollections,
  mockFields,
  mockItems,
  mockWorkspaces,
} from '@/mocks';
import type { Collection, Item, PropertyField, Workspace } from '@/types';
import {
  demoStorageKeys,
  getDemoStorageBoolean,
  getDemoStorageString,
  removeDemoStorage,
  setDemoStorageBoolean,
  setDemoStorageString,
} from './storage';
import type { DemoData, DemoSession } from './types';

const WORKSPACE_EMOJIS = ['🅿️', '🥫', '🌿', '📦', '🚗', '📚', '📷', '🏠', '📋', '📝'];

/** Bump when mock seed content changes so AsyncStorage picks up new fixtures. */
export const DEMO_SEED_VERSION = 3;

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function seedData(): DemoData {
  return {
    workspaces: clone(mockWorkspaces),
    collections: clone(mockCollections),
    fields: clone(mockFields),
    items: clone(mockItems),
  };
}

async function readData(): Promise<DemoData> {
  const raw = await getDemoStorageString(demoStorageKeys.data);
  if (!raw) {
    const data = seedData();
    await setDemoStorageString(demoStorageKeys.data, JSON.stringify(data));
    return data;
  }

  try {
    return JSON.parse(raw) as DemoData;
  } catch {
    const data = seedData();
    await setDemoStorageString(demoStorageKeys.data, JSON.stringify(data));
    logDemo('Reset corrupt demo data');
    return data;
  }
}

async function writeData(data: DemoData): Promise<void> {
  await setDemoStorageString(demoStorageKeys.data, JSON.stringify(data));
}

export async function ensureDemoInitialized(): Promise<void> {
  const seedVersion = await getDemoStorageString(demoStorageKeys.seedVersion);
  const needsReseed = seedVersion !== String(DEMO_SEED_VERSION);

  if (needsReseed) {
    await writeData(seedData());
    await setDemoStorageBoolean(demoStorageKeys.initialized, true);
    await setDemoStorageString(demoStorageKeys.seedVersion, String(DEMO_SEED_VERSION));
    logDemo(`Seeded demo workspace data v${DEMO_SEED_VERSION}`);
  } else {
    logDemo('Using demo workspace data');
  }
}

export async function getDemoData(): Promise<DemoData> {
  await ensureDemoInitialized();
  return readData();
}

export async function mutateDemoData(mutator: (data: DemoData) => void): Promise<DemoData> {
  const data = await getDemoData();
  mutator(data);
  await writeData(data);
  return data;
}

export async function getDemoSession(): Promise<DemoSession | null> {
  const raw = await getDemoStorageString(demoStorageKeys.session);
  if (!raw) return null;
  return JSON.parse(raw) as DemoSession;
}

export async function setDemoSession(user: ApiUser): Promise<void> {
  await setDemoStorageString(
    demoStorageKeys.session,
    JSON.stringify({ user } satisfies DemoSession),
  );
}

export async function clearDemoSession(): Promise<void> {
  await removeDemoStorage(demoStorageKeys.session);
}

export function syncCollectionStats(data: DemoData, collectionId: string): void {
  const collection = data.collections.find((c) => c.id === collectionId);
  if (!collection) return;

  const collectionItems = data.items.filter((item) => item.collectionId === collectionId);
  collection.itemCount = collectionItems.length;

  if (collectionItems.length === 0) return;

  const latest = collectionItems.reduce((max, item) =>
    item.updatedAt > max ? item.updatedAt : max,
  collectionItems[0].updatedAt);

  collection.lastActivityAt = latest;
}

export function workspaceEmojiForIndex(index: number): string {
  return WORKSPACE_EMOJIS[index % WORKSPACE_EMOJIS.length];
}

export function findWorkspace(data: DemoData, workspaceId: string): Workspace | undefined {
  return data.workspaces.find((w) => w.id === workspaceId);
}

export function findCollection(
  data: DemoData,
  workspaceId: string,
  collectionId: string,
): Collection | undefined {
  return data.collections.find(
    (c) => c.id === collectionId && c.workspaceId === workspaceId,
  );
}

export function findItem(
  data: DemoData,
  collectionId: string,
  itemId: string,
): Item | undefined {
  return data.items.find((i) => i.id === itemId && i.collectionId === collectionId);
}

export function collectionFields(data: DemoData, collectionId: string): PropertyField[] {
  return data.fields
    .filter((f) => f.collectionId === collectionId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function collectionItems(data: DemoData, collectionId: string): Item[] {
  return data.items.filter((i) => i.collectionId === collectionId);
}
