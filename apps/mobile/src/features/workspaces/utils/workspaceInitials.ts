import { displayInitials } from '@/shared/utils/displayInitials';

/** Up to two letters for story-style place avatars. */
export function workspaceInitials(name: string): string {
  return displayInitials(name);
}
