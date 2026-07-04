import { forwardRef, useImperativeHandle, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTheme } from '@/theme';
import { Button, NotebookPageRow, Stack, Text } from '@/shared/ui';
import { ItemData, PropertyField } from '@/types';
import { formatFieldValue } from '@/utils';
import { buildDefaultValues } from '../validation/defaultValues';
import { buildZodSchema, DynamicFormValues } from '../validation/buildZodSchema';
import { renderPropertyField } from './fields/fieldRegistry';

export interface DynamicItemFormHandle {
  submit: () => void;
  reset: () => void;
}

export type DynamicItemFormMode = 'view' | 'edit';
export type DynamicItemFormLayout = 'stack' | 'page';

export interface DynamicItemFormProps {
  fields: PropertyField[];
  initialValues?: ItemData;
  submitLabel?: string;
  onSubmit: (values: ItemData) => void | Promise<void>;
  hideSubmitButton?: boolean;
  mode?: DynamicItemFormMode;
  layout?: DynamicItemFormLayout;
}

export const DynamicItemForm = forwardRef<DynamicItemFormHandle, DynamicItemFormProps>(
  function DynamicItemForm(
    {
      fields,
      initialValues,
      submitLabel = 'Save item',
      onSubmit,
      hideSubmitButton = false,
      mode = 'edit',
      layout = 'stack',
    },
    ref,
  ) {
    const { spacing } = useTheme();
    const schema = useMemo(() => buildZodSchema(fields), [fields]);
    const defaultValues = useMemo(
      () => buildDefaultValues(fields, initialValues),
      [fields, initialValues],
    );

    const { control, handleSubmit, reset } = useForm<DynamicFormValues>({
      resolver: zodResolver(schema),
      defaultValues,
      mode: 'onSubmit',
    });

    const handleValid = async (values: DynamicFormValues) => {
      const normalized: ItemData = { ...(values as ItemData) };

      for (const field of fields) {
        if (field.type === 'number' && normalized[field.key] != null) {
          normalized[field.key] = Number(normalized[field.key]);
        }
        if (field.type === 'boolean' && normalized[field.key] == null) {
          normalized[field.key] = false;
        }
      }

      await onSubmit(normalized);
    };

    useImperativeHandle(ref, () => ({
      submit: () => {
        void handleSubmit(handleValid)();
      },
      reset: () => {
        reset(defaultValues);
      },
    }));

    if (fields.length === 0) {
      return null;
    }

    if (layout === 'page') {
      return (
        <View style={styles.pageFields}>
          {fields.map((field, index) => {
            const label = `${field.label}${field.required && mode === 'edit' ? ' *' : ''}`;
            const showDivider = index < fields.length - 1;
            const rawValue = initialValues?.[field.key];
            const isEmpty = rawValue == null || rawValue === '';
            const displayValue = isEmpty ? 'Not set' : formatFieldValue(field, rawValue);

            return (
              <NotebookPageRow
                key={field.id}
                label={label}
                showDivider={showDivider}
                editing={mode === 'edit'}
              >
                {mode === 'view' ? (
                  <Text variant="body" color={isEmpty ? 'tertiary' : 'primary'}>
                    {displayValue}
                  </Text>
                ) : (
                  renderPropertyField(field, control, { embedded: true })
                )}
              </NotebookPageRow>
            );
          })}
        </View>
      );
    }

    return (
      <View style={styles.form}>
        <Stack gap="md">{fields.map((field) => renderPropertyField(field, control))}</Stack>
        {!hideSubmitButton ? (
          <View style={[styles.footer, { paddingTop: spacing.lg, paddingBottom: spacing.md }]}>
            <Button label={submitLabel} fullWidth onPress={handleSubmit(handleValid)} />
          </View>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  pageFields: {
    width: '100%',
  },
  footer: {},
});
