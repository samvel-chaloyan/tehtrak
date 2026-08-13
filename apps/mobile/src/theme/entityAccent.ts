import type { Colors } from '@/theme/colors';
import type { PinEntityType } from '@/types';

/** Entity accent for corner marks, chips, and pinned bookmarks. */
export type EntityAccent = PinEntityType;

export function entityAccentColor(colors: Colors, entity: EntityAccent): string {
  if (entity === 'workspace') {
    return colors.entityWorkspace;
  }
  if (entity === 'collection') {
    return colors.entityCollection;
  }
  return colors.entityItem;
}

export function entityAccentMuted(colors: Colors, entity: EntityAccent): string {
  if (entity === 'workspace') {
    return colors.entityWorkspaceMuted;
  }
  if (entity === 'collection') {
    return colors.entityCollectionMuted;
  }
  return colors.entityItemMuted;
}
