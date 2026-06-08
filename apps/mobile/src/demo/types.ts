import type { ApiUser } from '@/core/api/types';
import type { Collection, Item, PropertyField, Workspace } from '@/types';

export interface DemoSession {
  user: ApiUser;
}

export interface DemoData {
  workspaces: Workspace[];
  collections: Collection[];
  fields: PropertyField[];
  items: Item[];
}
