import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Input } from '@/shared/ui';
import { PropertyField } from '@/types';

interface TextFieldProps<T extends FieldValues> {
  field: PropertyField;
  control: Control<T>;
  embedded?: boolean;
}

export function TextField<T extends FieldValues>({
  field,
  control,
  embedded = false,
}: TextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={field.key as Path<T>}
      render={({ field: rhf, fieldState }) => (
        <Input
          label={embedded ? undefined : `${field.label}${field.required ? ' *' : ''}`}
          value={rhf.value != null ? String(rhf.value) : ''}
          onChangeText={rhf.onChange}
          onBlur={rhf.onBlur}
          error={fieldState.error?.message}
          placeholder={embedded ? `Enter ${field.label.toLowerCase()}` : `Enter ${field.label.toLowerCase()}`}
          autoCapitalize="sentences"
          variant={embedded ? 'plain' : 'default'}
        />
      )}
    />
  );
}
