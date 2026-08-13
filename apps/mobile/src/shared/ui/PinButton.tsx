import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { PinTarget } from '@/types';
import { useTheme } from '@/theme';
import { entityAccentColor } from '@/theme/entityAccent';

import { useIsPinned, usePins } from '@/features/pins/hooks/usePins';

export interface PinButtonProps {
  target: PinTarget;
  /** Slightly smaller hit for dense rows. */
  compact?: boolean;
}

/** Quiet pin / unpin — icon change only, no confirm or toast. */
export function PinButton({ target, compact = false }: PinButtonProps) {
  const { colors } = useTheme();
  const pinned = useIsPinned(target);
  const { togglePin } = usePins();
  const size = compact ? 20 : 22;
  const pinnedColor = entityAccentColor(colors, target.type);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={pinned ? 'Unpin' : 'Pin'}
      hitSlop={10}
      onPress={(event) => {
        // Nested pressables: keep the row/card from opening.
        'stopPropagation' in event && event.stopPropagation();
        togglePin(target);
      }}
      style={({ pressed }) => [styles.hit, { opacity: pressed ? 0.65 : 1 }]}
    >
      <Ionicons
        name={pinned ? 'bookmark' : 'bookmark-outline'}
        size={size}
        color={pinned ? pinnedColor : colors.textTertiary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hit: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
