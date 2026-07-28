import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme';

const ICON_SIZE = 16;

export interface RowActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export function RowActions({ onEdit, onDelete }: RowActionsProps) {
  const { colors, radius, spacing } = useTheme();

  if (!onEdit && !onDelete) {
    return null;
  }

  return (
    <View style={[styles.wrap, { gap: spacing.xs, paddingRight: spacing.sm }]}>
      {onEdit ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Edit"
          hitSlop={6}
          onPress={onEdit}
          style={({ pressed }) => [
            styles.action,
            {
              borderRadius: radius.sm,
              borderColor: colors.primary,
              backgroundColor: pressed ? colors.primaryMuted : colors.surface,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <Ionicons name="create-outline" size={ICON_SIZE} color={colors.primary} />
        </Pressable>
      ) : null}
      {onDelete ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Delete"
          hitSlop={6}
          onPress={onDelete}
          style={({ pressed }) => [
            styles.action,
            {
              borderRadius: radius.sm,
              borderColor: colors.dangerEmphasis,
              backgroundColor: pressed ? colors.dangerMuted : colors.surface,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <Ionicons name="trash-outline" size={ICON_SIZE} color={colors.dangerEmphasis} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  action: {
    width: 32,
    height: 32,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
