import { Item, PropertyField } from '@/types';

export function getItemTitle(item: Item, fields: PropertyField[]): string {
  const firstText = fields.find((f) => f.type === 'text');
  if (firstText) {
    const value = item.data[firstText.key];
    if (typeof value === 'string' && value.trim()) return value;
  }

  const firstField = fields[0];
  if (firstField) {
    const value = item.data[firstField.key];
    if (value != null && value !== '') return String(value);
  }

  return 'Untitled entry';
}

export function getItemSubtitle(item: Item, fields: PropertyField[]): string | undefined {
  const parts: string[] = [];

  for (const field of fields.slice(1, 4)) {
    const raw = item.data[field.key];
    if (raw == null || raw === '') continue;

    if (field.type === 'boolean') {
      if (raw === true) parts.push(field.label);
      continue;
    }

    if (field.type === 'select') {
      const option = field.config?.options?.find((o) => o.value === raw);
      parts.push(option?.label ?? String(raw));
      continue;
    }

    if (field.type === 'date') {
      parts.push(String(raw).slice(0, 10));
      continue;
    }

    parts.push(String(raw));
  }

  return parts.length ? parts.join(' · ') : undefined;
}

export function formatFieldValue(
  field: PropertyField,
  value: unknown,
): string {
  if (value == null || value === '') return '—';

  switch (field.type) {
    case 'boolean':
      return value ? 'Yes' : 'No';
    case 'select': {
      const option = field.config?.options?.find((o) => o.value === value);
      return option?.label ?? String(value);
    }
    case 'date':
      return String(value).includes('T')
        ? new Date(String(value)).toLocaleDateString()
        : String(value);
    case 'number':
      return String(value);
    default:
      return String(value);
  }
}
