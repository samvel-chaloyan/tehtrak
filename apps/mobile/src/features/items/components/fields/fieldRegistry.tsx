import { ComponentType } from 'react';
import { Control, FieldValues } from 'react-hook-form';
import { PropertyField, PropertyType } from '@/types';
import { BooleanField } from './BooleanField';
import { DateField } from './DateField';
import { NumberField } from './NumberField';
import { SelectField } from './SelectField';
import { TextField } from './TextField';

type FieldComponent<T extends FieldValues> = ComponentType<{
  field: PropertyField;
  control: Control<T>;
}>;

export const fieldRegistry: Record<PropertyType, FieldComponent<FieldValues>> = {
  text: TextField,
  number: NumberField,
  date: DateField,
  boolean: BooleanField,
  select: SelectField,
};

export function renderPropertyField<T extends FieldValues>(
  field: PropertyField,
  control: Control<T>,
) {
  const Component = fieldRegistry[field.type] as FieldComponent<T>;
  return <Component key={field.id} field={field} control={control} />;
}
