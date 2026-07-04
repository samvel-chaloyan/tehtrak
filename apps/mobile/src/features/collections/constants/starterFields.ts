import type { PropertyType } from '@/types';

export interface StarterFieldDefinition {
  id: string;
  label: string;
  type: PropertyType;
  required: boolean;
  defaultEnabled: boolean;
}

/** Common fields users pick when defining an item template. */
export const STARTER_FIELDS: StarterFieldDefinition[] = [
  { id: 'name', label: 'Name', type: 'text', required: true, defaultEnabled: true },
  {
    id: 'description',
    label: 'Description',
    type: 'text',
    required: false,
    defaultEnabled: true,
  },
  { id: 'count', label: 'Count', type: 'number', required: false, defaultEnabled: false },
];

export interface CustomFieldDraft {
  label: string;
  type: Extract<PropertyType, 'text' | 'number'>;
}

export function fieldCountLabel(count: number) {
  if (count === 1) {
    return '1 field each';
  }
  return `${count} fields each`;
}

export function itemCountLabel(count: number) {
  return count === 1 ? '1 item' : `${count} items`;
}

export function collectionDetailsMeta(itemCount: number, fieldCount: number) {
  return `${itemCountLabel(itemCount)} · ${fieldCountLabel(fieldCount)}`;
}
