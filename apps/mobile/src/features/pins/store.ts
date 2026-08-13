import { create } from 'zustand';

import { appConfig } from '@/config/app';
import { getString, setString } from '@/services/storage';
import type { Pin, PinTarget } from '@/types';
import { createId } from '@/utils';

import { pinsMatch } from './utils/pinIdentity';

interface PinStoreState {
  pins: Pin[];
  hydrated: boolean;
  hydrate: () => Promise<void>;
  isPinned: (target: PinTarget) => boolean;
  togglePin: (target: PinTarget) => void;
  removePinsMatching: (predicate: (pin: Pin) => boolean) => void;
}

async function persist(pins: Pin[]) {
  await setString(appConfig.storageKeys.pins, JSON.stringify(pins));
}

function sortPins(pins: Pin[]): Pin[] {
  return [...pins].sort((a, b) => a.sortIndex - b.sortIndex || a.pinnedAt.localeCompare(b.pinnedAt));
}

export const usePinStore = create<PinStoreState>((set, get) => ({
  pins: [],
  hydrated: false,

  hydrate: async () => {
    try {
      const raw = await getString(appConfig.storageKeys.pins);
      if (!raw) {
        set({ pins: [], hydrated: true });
        return;
      }
      const parsed = JSON.parse(raw) as Pin[];
      if (!Array.isArray(parsed)) {
        set({ pins: [], hydrated: true });
        return;
      }
      set({ pins: sortPins(parsed), hydrated: true });
    } catch {
      set({ pins: [], hydrated: true });
    }
  },

  isPinned: (target) => get().pins.some((pin) => pinsMatch(pin, target)),

  togglePin: (target) => {
    const { pins } = get();
    const existing = pins.find((pin) => pinsMatch(pin, target));

    if (existing) {
      const next = pins.filter((pin) => pin.id !== existing.id);
      set({ pins: next });
      void persist(next);
      return;
    }

    const nextIndex =
      pins.reduce((max, pin) => (pin.sortIndex > max ? pin.sortIndex : max), -1) + 1;

    const pin: Pin = {
      id: createId('pin'),
      type: target.type,
      workspaceId: target.workspaceId,
      collectionId: target.type === 'workspace' ? undefined : target.collectionId,
      itemId: target.type === 'item' ? target.itemId : undefined,
      pinnedAt: new Date().toISOString(),
      sortIndex: nextIndex,
    };

    const next = sortPins([...pins, pin]);
    set({ pins: next });
    void persist(next);
  },

  removePinsMatching: (predicate) => {
    const { pins } = get();
    const next = pins.filter((pin) => !predicate(pin));
    if (next.length === pins.length) {
      return;
    }
    set({ pins: next });
    void persist(next);
  },
}));

/** Convenience for non-hook call sites (delete mutations). */
export function removePinsForWorkspace(workspaceId: string) {
  usePinStore.getState().removePinsMatching((pin) => pin.workspaceId === workspaceId);
}

export function removePinsForCollection(workspaceId: string, collectionId: string) {
  usePinStore.getState().removePinsMatching(
    (pin) =>
      pin.workspaceId === workspaceId &&
      pin.collectionId === collectionId &&
      (pin.type === 'collection' || pin.type === 'item'),
  );
}

export function removePinsForItem(
  workspaceId: string,
  collectionId: string,
  itemId: string,
) {
  usePinStore.getState().removePinsMatching(
    (pin) =>
      pin.type === 'item' &&
      pin.workspaceId === workspaceId &&
      pin.collectionId === collectionId &&
      pin.itemId === itemId,
  );
}

export function getPinByTarget(target: PinTarget): Pin | undefined {
  return usePinStore.getState().pins.find((pin) => pinsMatch(pin, target));
}
