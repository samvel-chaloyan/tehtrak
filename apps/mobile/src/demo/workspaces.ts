import type { Workspace } from '@/types';
import { createId } from '@/utils';
import { demoDelay } from './delay';
import {
  getDemoData,
  mutateDemoData,
  workspaceEmojiForIndex,
} from './state';

export async function demoFetchWorkspaces(): Promise<Workspace[]> {
  await demoDelay();
  return (await getDemoData()).workspaces;
}

export async function demoCreateWorkspace(name: string): Promise<Workspace> {
  await demoDelay();
  let created!: Workspace;
  await mutateDemoData((data) => {
    created = {
      id: createId('ws'),
      name: name.trim(),
      description: 'Your operational notebook',
      emoji: workspaceEmojiForIndex(data.workspaces.length),
    };
    data.workspaces.push(created);
  });
  return created;
}

export async function demoUpdateWorkspace(id: string, name: string): Promise<Workspace> {
  await demoDelay();
  let updated!: Workspace;
  await mutateDemoData((data) => {
    const workspace = data.workspaces.find((w) => w.id === id);
    if (!workspace) throw new Error('Workspace not found');
    workspace.name = name.trim();
    updated = { ...workspace };
  });
  return updated;
}

export async function demoDeleteWorkspace(id: string): Promise<void> {
  await demoDelay();
  await mutateDemoData((data) => {
    const collectionIds = data.collections
      .filter((c) => c.workspaceId === id)
      .map((c) => c.id);

    data.workspaces = data.workspaces.filter((w) => w.id !== id);
    data.collections = data.collections.filter((c) => c.workspaceId !== id);
    data.fields = data.fields.filter((f) => !collectionIds.includes(f.collectionId));
    data.items = data.items.filter((i) => !collectionIds.includes(i.collectionId));
  });
}
