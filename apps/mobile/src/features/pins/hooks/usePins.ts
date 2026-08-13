import { useCallback, useMemo } from 'react';

import type { Pin, PinTarget } from '@/types';

import {
  removePinsForCollection,
  removePinsForItem,
  removePinsForWorkspace,
  usePinStore,
} from '../store';

export function usePins() {
  const pins = usePinStore((s) => s.pins);
  const hydrated = usePinStore((s) => s.hydrated);
  const togglePin = usePinStore((s) => s.togglePin);
  const isPinnedFn = usePinStore((s) => s.isPinned);

  const isPinned = useCallback((target: PinTarget) => isPinnedFn(target), [isPinnedFn]);

  const orderedPins = useMemo(() => pins, [pins]);

  const workspacePins = useMemo(
    () => orderedPins.filter((p) => p.type === 'workspace'),
    [orderedPins],
  );
  const collectionPins = useMemo(
    () => orderedPins.filter((p) => p.type === 'collection'),
    [orderedPins],
  );
  const itemPins = useMemo(
    () => orderedPins.filter((p) => p.type === 'item'),
    [orderedPins],
  );

  return {
    pins: orderedPins,
    workspacePins,
    collectionPins,
    itemPins,
    hydrated,
    isPinned,
    togglePin,
  };
}

export function useIsPinned(target: PinTarget): boolean {
  return usePinStore((s) => s.pins.some((pin) => {
    if (pin.type !== target.type || pin.workspaceId !== target.workspaceId) {
      return false;
    }
    if (target.type === 'workspace') {
      return true;
    }
    if (target.type === 'collection') {
      return pin.collectionId === target.collectionId;
    }
    return pin.collectionId === target.collectionId && pin.itemId === target.itemId;
  }));
}

export type { Pin };

export {
  removePinsForCollection,
  removePinsForItem,
  removePinsForWorkspace,
};
