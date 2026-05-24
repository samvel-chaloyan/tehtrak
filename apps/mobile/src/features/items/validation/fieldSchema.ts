import { z } from 'zod';
import { PropertyField } from '@/types';

export function fieldSchema(field: PropertyField): z.ZodTypeAny {
  switch (field.type) {
    case 'text': {
      let schema = z.string();
      if (field.config?.maxLength) {
        schema = schema.max(field.config.maxLength);
      }
      return field.required ? schema.min(1, `${field.label} is required`) : schema.optional();
    }
    case 'number': {
      let schema = z.coerce.number();
      if (field.config?.min != null) schema = schema.min(field.config.min);
      if (field.config?.max != null) schema = schema.max(field.config.max);
      return field.required
        ? schema.refine((v) => !Number.isNaN(v), { message: `${field.label} is required` })
        : schema.optional();
    }
    case 'date': {
      const schema = z.string().min(1);
      return field.required ? schema.min(1, `${field.label} is required`) : schema.optional();
    }
    case 'boolean': {
      return field.required ? z.boolean() : z.boolean().optional();
    }
    case 'select': {
      const values = field.config?.options?.map((o) => o.value) ?? [];
      if (values.length === 0) {
        return field.required ? z.string().min(1) : z.string().optional();
      }
      const schema = z.enum(values as [string, ...string[]]);
      return field.required ? schema : schema.optional();
    }
    default:
      return z.unknown().optional();
  }
}
