export type PropertyType = 'text' | 'number' | 'date' | 'boolean' | 'select';

export interface SelectOption {
  label: string;
  value: string;
}

export interface PropertyConfig {
  maxLength?: number;
  min?: number;
  max?: number;
  options?: SelectOption[];
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

export interface WorkspaceSummary {
  collectionCount: number;
  lastActivityAt?: string;
}

export interface Collection {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  emoji: string;
  itemCount: number;
  lastActivityAt: string;
}

export interface PropertyField {
  id: string;
  collectionId: string;
  key: string;
  label: string;
  type: PropertyType;
  required: boolean;
  sortOrder: number;
  config?: PropertyConfig;
}

export type ItemData = Record<string, string | number | boolean | null | undefined>;

export interface Item {
  id: string;
  collectionId: string;
  data: ItemData;
  createdAt: string;
  updatedAt: string;
}

export interface DraftProperty {
  label: string;
  type: PropertyType;
  required: boolean;
  config?: PropertyConfig;
}

/** Quick Access pin target kind. */
export type PinEntityType = 'workspace' | 'collection' | 'item';

/**
 * User-pinned object for Quick Access.
 * Display titles resolve live from domain data — never denormalized here.
 * `sortIndex` reserved for drag-reorder; `pinnedAt` for later sort modes.
 * Future: `source: 'pin' | 'recent'` without changing chip UI.
 */
export interface Pin {
  id: string;
  type: PinEntityType;
  workspaceId: string;
  collectionId?: string;
  itemId?: string;
  pinnedAt: string;
  sortIndex: number;
}

/** Identity used to toggle / look up a pin. */
export type PinTarget =
  | { type: 'workspace'; workspaceId: string }
  | { type: 'collection'; workspaceId: string; collectionId: string }
  | { type: 'item'; workspaceId: string; collectionId: string; itemId: string };
