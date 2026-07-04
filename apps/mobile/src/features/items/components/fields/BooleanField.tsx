import { Pressable, StyleSheet, Switch, View } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useTheme } from '@/theme';
import { Text } from '@/shared/ui';
import { PropertyField } from '@/types';

interface BooleanFieldProps<T extends FieldValues> {
  field: PropertyField;
  control: Control<T>;
  embedded?: boolean;
}

export function BooleanField<T extends FieldValues>({
  field,
  control,
  embedded = false,
}: BooleanFieldProps<T>) {
  const { colors, radius, spacing } = useTheme();

  return (
    <Controller
      control={control}
      name={field.key as Path<T>}
      render={({ field: rhf }) => {
        const row = (
          <>
            {!embedded ? (
              <View style={styles.labelWrap}>
                <Text variant="body">{field.label}</Text>
                {field.required ? (
                  <Text variant="caption" color="tertiary">
                    Required
                  </Text>
                ) : null}
              </View>
            ) : null}
            <Switch
              value={Boolean(rhf.value)}
              onValueChange={rhf.onChange}
              trackColor={{ false: colors.border, true: colors.primaryMuted }}
              thumbColor={rhf.value ? colors.primary : colors.background}
            />
          </>
        );

        if (embedded) {
          return (
            <View style={styles.embeddedRow}>
              <Text variant="body">{rhf.value ? 'Yes' : 'No'}</Text>
              <Switch
                value={Boolean(rhf.value)}
                onValueChange={rhf.onChange}
                trackColor={{ false: colors.border, true: colors.primaryMuted }}
                thumbColor={rhf.value ? colors.primary : colors.background}
              />
            </View>
          );
        }

        return (
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
            {row}
          </Pressable>
        );
      }}
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
  embeddedRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  labelWrap: {
    flex: 1,
    gap: 2,
  },
});
