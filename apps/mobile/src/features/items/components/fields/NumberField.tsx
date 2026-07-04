import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Input } from '@/shared/ui';
import { PropertyField } from '@/types';

interface NumberFieldProps<T extends FieldValues> {
  field: PropertyField;
  control: Control<T>;
  embedded?: boolean;
}

export function NumberField<T extends FieldValues>({
  field,
  control,
  embedded = false,
}: NumberFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={field.key as Path<T>}
      render={({ field: rhf, fieldState }) => (
        <Input
          label={embedded ? undefined : `${field.label}${field.required ? ' *' : ''}`}
          value={rhf.value != null && rhf.value !== '' ? String(rhf.value) : ''}
          onChangeText={(text) => {
            if (text === '') {
              rhf.onChange(undefined);
              return;
            }
            rhf.onChange(text);
          }}
          onBlur={rhf.onBlur}
          error={fieldState.error?.message}
          keyboardType="decimal-pad"
          placeholder={embedded ? '0' : '0'}
          variant={embedded ? 'plain' : 'default'}
        />
      )}
    />
  );
}
