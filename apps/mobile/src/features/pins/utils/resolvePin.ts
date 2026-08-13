import type { AppStackParamList } from '@/navigation/types';
import type { Collection, Item, Pin, PropertyField, Workspace } from '@/types';
import { getItemTitle } from '@/utils';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { pinLetter } from './pinIdentity';

export interface ResolvedPin {
  pin: Pin;
  title: string;
  letter: string;
  /** False when the target entity no longer exists. */
  resolvable: boolean;
}

type PinNav = Pick<NativeStackNavigationProp<AppStackParamList>, 'navigate'>;

export function resolvePinTitle(
  pin: Pin,
  ctx: {
    workspaces: Workspace[];
    collections: Collection[];
    items: Item[];
    fieldsByCollection: Record<string, PropertyField[]>;
  },
): string | null {
  if (pin.type === 'workspace') {
    return ctx.workspaces.find((w) => w.id === pin.workspaceId)?.name ?? null;
  }
  if (pin.type === 'collection') {
    return (
      ctx.collections.find(
        (c) => c.id === pin.collectionId && c.workspaceId === pin.workspaceId,
      )?.name ?? null
    );
  }
  const item = ctx.items.find(
    (i) => i.id === pin.itemId && i.collectionId === pin.collectionId,
  );
  if (!item || !pin.collectionId) {
    return null;
  }
  const fields = ctx.fieldsByCollection[pin.collectionId] ?? [];
  return getItemTitle(item, fields);
}

export function resolvePins(
  pins: Pin[],
  ctx: {
    workspaces: Workspace[];
    collections: Collection[];
    items: Item[];
    fieldsByCollection: Record<string, PropertyField[]>;
  },
): ResolvedPin[] {
  return pins.map((pin) => {
    const title = resolvePinTitle(pin, ctx);
    if (!title) {
      return { pin, title: 'Unavailable', letter: '?', resolvable: false };
    }
    return { pin, title, letter: pinLetter(title), resolvable: true };
  });
}

export function navigateToPin(navigation: PinNav, pin: Pin, title: string) {
  if (pin.type === 'workspace') {
    navigation.navigate('CollectionList', {
      workspaceId: pin.workspaceId,
      workspaceName: title,
    });
    return;
  }

  if (pin.type === 'collection' && pin.collectionId) {
    navigation.navigate('CollectionDetails', {
      workspaceId: pin.workspaceId,
      collectionId: pin.collectionId,
      collectionName: title,
    });
    return;
  }

  if (pin.type === 'item' && pin.collectionId && pin.itemId) {
    navigation.navigate('ItemDetails', {
      workspaceId: pin.workspaceId,
      collectionId: pin.collectionId,
      collectionName: title,
      itemId: pin.itemId,
    });
  }
}
