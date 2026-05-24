import { PropertyField } from '@/types';
import { DynamicFormValues } from './buildZodSchema';

export function buildDefaultValues(
  fields: PropertyField[],
  existing?: Record<string, unknown>,
): DynamicFormValues {
  const values: Record<string, unknown> = {};

  for (const field of fields) {
    const existingValue = existing?.[field.key];

    if (existingValue !== undefined) {
      values[field.key] = existingValue;
      continue;
    }

    switch (field.type) {
      case 'boolean':
        values[field.key] = false;
        break;
      case 'number':
        values[field.key] = undefined;
        break;
      default:
        values[field.key] = '';
        break;
    }
  }

  return values as DynamicFormValues;
}
