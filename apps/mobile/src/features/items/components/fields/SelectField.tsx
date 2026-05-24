import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useTheme } from '@/theme';
import { Stack, Text } from '@/shared/ui';
import { PropertyField } from '@/types';

interface SelectFieldProps<T extends FieldValues> {
  field: PropertyField;
  control: Control<T>;
}

export function SelectField<T extends FieldValues>({ field, control }: SelectFieldProps<T>) {
  const { colors, radius, spacing } = useTheme();
  const [open, setOpen] = useState(false);
  const options = field.config?.options ?? [];

  return (
    <Controller
      control={control}
      name={field.key as Path<T>}
      render={({ field: rhf, fieldState }) => {
        const selected = options.find((o) => o.value === rhf.value);

        return (
          <>
            <Stack gap="xs">
              <Text variant="label" color="secondary">
                {field.label}
                {field.required ? ' *' : ''}
              </Text>
              <Pressable
                onPress={() => setOpen(true)}
                style={[
                  styles.trigger,
                  {
                    backgroundColor: colors.surface,
                    borderColor: fieldState.error ? colors.danger : colors.border,
                    borderRadius: radius.md,
                    paddingHorizontal: spacing.md,
                    paddingVertical: spacing.sm + 4,
                  },
                ]}
              >
                <Text variant="body" color={selected ? 'primary' : 'tertiary'}>
                  {selected?.label ?? 'Choose an option'}
                </Text>
              </Pressable>
              {fieldState.error ? (
                <Text variant="caption" color="danger">
                  {fieldState.error.message}
                </Text>
              ) : null}
            </Stack>

            <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
              <Pressable style={[styles.overlay, { backgroundColor: colors.overlay }]} onPress={() => setOpen(false)}>
                <Pressable
                  style={[
                    styles.sheet,
                    {
                      backgroundColor: colors.background,
                      borderRadius: radius.lg,
                      marginHorizontal: spacing.md,
                      padding: spacing.md,
                    },
                  ]}
                  onPress={(e) => e.stopPropagation()}
                >
                  <Text variant="subtitle" style={{ marginBottom: spacing.md }}>
                    {field.label}
                  </Text>
                  <Stack gap="xs">
                    {options.map((option) => (
                      <Pressable
                        key={option.value}
                        onPress={() => {
                          rhf.onChange(option.value);
                          setOpen(false);
                        }}
                        style={[
                          styles.option,
                          {
                            backgroundColor:
                              rhf.value === option.value ? colors.primaryMuted : colors.surface,
                            borderRadius: radius.md,
                            padding: spacing.md,
                          },
                        ]}
                      >
                        <Text
                          variant="body"
                          color={rhf.value === option.value ? 'accent' : 'primary'}
                        >
                          {option.label}
                        </Text>
                      </Pressable>
                    ))}
                  </Stack>
                </Pressable>
              </Pressable>
            </Modal>
          </>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
  },
  sheet: {
    maxHeight: '70%',
  },
  trigger: {
    borderWidth: 1,
    minHeight: 48,
    justifyContent: 'center',
  },
  option: {},
});
