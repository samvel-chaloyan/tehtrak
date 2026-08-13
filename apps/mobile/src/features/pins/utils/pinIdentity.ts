import type { Pin, PinTarget } from '@/types';
import { displayInitials } from '@/shared/utils/displayInitials';

/** Stable identity key for lookup / toggle. */
export function pinTargetKey(target: PinTarget): string {
  if (target.type === 'workspace') {
    return `workspace:${target.workspaceId}`;
  }
  if (target.type === 'collection') {
    return `collection:${target.workspaceId}:${target.collectionId}`;
  }
  return `item:${target.workspaceId}:${target.collectionId}:${target.itemId}`;
}

export function pinToTarget(pin: Pin): PinTarget {
  if (pin.type === 'workspace') {
    return { type: 'workspace', workspaceId: pin.workspaceId };
  }
  if (pin.type === 'collection') {
    return {
      type: 'collection',
      workspaceId: pin.workspaceId,
      collectionId: pin.collectionId!,
    };
  }
  return {
    type: 'item',
    workspaceId: pin.workspaceId,
    collectionId: pin.collectionId!,
    itemId: pin.itemId!,
  };
}

export function pinsMatch(pin: Pin, target: PinTarget): boolean {
  return pinTargetKey(pinToTarget(pin)) === pinTargetKey(target);
}

/** First letters of the first two words (or first two chars of one word) for Quick Access chips. */
export function pinLetter(title: string): string {
  return displayInitials(title);
}
