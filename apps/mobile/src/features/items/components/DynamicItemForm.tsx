import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTheme } from '@/theme';
import { Button, Stack } from '@/shared/ui';
import { ItemData, PropertyField } from '@/types';
import { buildDefaultValues } from '../validation/defaultValues';
import { buildZodSchema, DynamicFormValues } from '../validation/buildZodSchema';
import { renderPropertyField } from './fields/fieldRegistry';

export interface DynamicItemFormProps {
  fields: PropertyField[];
  initialValues?: ItemData;
  submitLabel?: string;
  onSubmit: (values: ItemData) => void;
}

export function DynamicItemForm({
  fields,
  initialValues,
  submitLabel = 'Save entry',
  onSubmit,
}: DynamicItemFormProps) {
  const { spacing } = useTheme();
  const schema = useMemo(() => buildZodSchema(fields), [fields]);
  const defaultValues = useMemo(
    () => buildDefaultValues(fields, initialValues),
    [fields, initialValues],
  );

  const { control, handleSubmit } = useForm<DynamicFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onSubmit',
  });

  const handleValid = (values: DynamicFormValues) => {
    const normalized: ItemData = { ...(values as ItemData) };

    for (const field of fields) {
      if (field.type === 'number' && normalized[field.key] != null) {
        normalized[field.key] = Number(normalized[field.key]);
      }
      if (field.type === 'boolean' && normalized[field.key] == null) {
        normalized[field.key] = false;
      }
    }

    onSubmit(normalized);
  };

  if (fields.length === 0) {
    return null;
  }

  return (
    <View style={styles.form}>
      <Stack gap="md">
        {fields.map((field) => renderPropertyField(field, control))}
      </Stack>
      <View style={[styles.footer, { paddingTop: spacing.lg, paddingBottom: spacing.md }]}>
        <Button label={submitLabel} fullWidth onPress={handleSubmit(handleValid)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  footer: {},
});
