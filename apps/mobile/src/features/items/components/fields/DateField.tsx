import { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useTheme } from '@/theme';
import { Stack, Text } from '@/shared/ui';
import { PropertyField } from '@/types';
import { formatDateDisplay } from '@/utils';

interface DateFieldProps<T extends FieldValues> {
  field: PropertyField;
  control: Control<T>;
}

export function DateField<T extends FieldValues>({ field, control }: DateFieldProps<T>) {
  const { colors, radius, spacing } = useTheme();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <Controller
      control={control}
      name={field.key as Path<T>}
      render={({ field: rhf, fieldState }) => {
        const dateValue = rhf.value ? new Date(String(rhf.value)) : new Date();
        const display = rhf.value ? formatDateDisplay(String(rhf.value)) : 'Select date';

        const onChange = (_event: DateTimePickerEvent, selected?: Date) => {
          if (Platform.OS === 'android') setShowPicker(false);
          if (selected) {
            rhf.onChange(selected.toISOString());
          }
        };

        return (
          <Stack gap="xs">
            <Text variant="label" color="secondary">
              {field.label}
              {field.required ? ' *' : ''}
            </Text>
            <Pressable
              onPress={() => setShowPicker(true)}
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
              <Text variant="body" color={rhf.value ? 'primary' : 'tertiary'}>
                {display}
              </Text>
            </Pressable>
            {fieldState.error ? (
              <Text variant="caption" color="danger">
                {fieldState.error.message}
              </Text>
            ) : null}
            {showPicker ? (
              <View>
                <DateTimePicker
                  value={dateValue}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'inline' : 'default'}
                  onChange={onChange}
                />
                {Platform.OS === 'ios' ? (
                  <Pressable onPress={() => setShowPicker(false)} style={{ marginTop: spacing.sm }}>
                    <Text variant="subtitle" color="accent">
                      Done
                    </Text>
                  </Pressable>
                ) : null}
              </View>
            ) : null}
          </Stack>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  trigger: {
    borderWidth: 1,
    minHeight: 48,
    justifyContent: 'center',
  },
});
