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
