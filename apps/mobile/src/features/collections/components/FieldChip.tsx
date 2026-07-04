import { Pressable, StyleSheet } from 'react-native';

import { Text } from '@/shared/ui';
import { useTheme } from '@/theme';

export interface FieldChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function FieldChip({ label, selected, onPress }: FieldChipProps) {
  const { colors, radius, spacing } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
          borderRadius: radius.button,
          borderColor: selected ? colors.primary : colors.primaryBorder,
          backgroundColor: selected ? colors.primaryMuted : colors.surface,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <Text variant="bodySmall" color={selected ? 'accent' : 'secondary'}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
  },
});
