import { Pressable, StyleSheet } from 'react-native';

import { Text } from '@/shared/ui';
import { useTheme } from '@/theme';

export interface WorkspaceShortcutChipProps {
  label: string;
  onPress: () => void;
  /** Soft accent for the last-opened place — not a filter selected state. */
  emphasized?: boolean;
}

/**
 * Quiet shortcut chip for Workspace home — FieldChip density, shortcut behavior.
 */
export function WorkspaceShortcutChip({
  label,
  onPress,
  emphasized = false,
}: WorkspaceShortcutChipProps) {
  const { colors, radius, spacing } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
          borderRadius: radius.button,
          borderColor: emphasized ? colors.primary : colors.primaryBorder,
          backgroundColor: emphasized ? colors.primaryMuted : colors.surface,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <Text variant="bodySmall" color={emphasized ? 'accent' : 'secondary'} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    maxWidth: '100%',
  },
});
