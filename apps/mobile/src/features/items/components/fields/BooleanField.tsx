import { Pressable, StyleSheet, Switch, View } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useTheme } from '@/theme';
import { Text } from '@/shared/ui';
import { PropertyField } from '@/types';

interface BooleanFieldProps<T extends FieldValues> {
  field: PropertyField;
  control: Control<T>;
}

export function BooleanField<T extends FieldValues>({ field, control }: BooleanFieldProps<T>) {
  const { colors, radius, spacing } = useTheme();

  return (
    <Controller
      control={control}
      name={field.key as Path<T>}
      render={({ field: rhf }) => (
        <Pressable
          style={[
            styles.row,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: radius.md,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
            },
          ]}
          onPress={() => rhf.onChange(!rhf.value)}
        >
          <View style={styles.labelWrap}>
            <Text variant="body">{field.label}</Text>
            {field.required ? (
              <Text variant="caption" color="tertiary">
                Required
              </Text>
            ) : null}
          </View>
          <Switch
            value={Boolean(rhf.value)}
            onValueChange={rhf.onChange}
            trackColor={{ false: colors.border, true: colors.primaryMuted }}
            thumbColor={rhf.value ? colors.primary : colors.background}
          />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 52,
  },
  labelWrap: {
    flex: 1,
    gap: 2,
  },
});
