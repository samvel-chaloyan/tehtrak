import { z } from 'zod';
import { PropertyField } from '@/types';
import { fieldSchema } from './fieldSchema';

export function buildZodSchema(fields: PropertyField[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of fields) {
    shape[field.key] = fieldSchema(field);
  }
  return z.object(shape);
}

export type DynamicFormValues = z.infer<ReturnType<typeof buildZodSchema>>;
