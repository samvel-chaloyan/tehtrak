import { Pressable, StyleSheet, View } from 'react-native';

import type { PinEntityType } from '@/types';
import { useTheme } from '@/theme';
import { entityAccentColor, entityAccentMuted } from '@/theme/entityAccent';

import { Text } from './Text';

const CHIP_SIZE = 40;

export interface QuickAccessChipProps {
  letter: string;
  /** Full name for accessibility; not shown under the circle. */
  label: string;
  entityType: PinEntityType;
  onPress: () => void;
  /** @deprecated Banner chips are circles only — kept for call-site compatibility. */
  compact?: boolean;
}

/** Circular Quick Access chip — two-letter initials + type color (no title under the circle). */
export function QuickAccessChip({
  letter,
  label,
  entityType,
  onPress,
}: QuickAccessChipProps) {
  const { colors } = useTheme();
  const ring = entityAccentColor(colors, entityType);
  const face = entityAccentMuted(colors, entityType);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.75 : 1 }]}
    >
      <View
        style={[
          styles.ring,
          {
            width: CHIP_SIZE + 4,
            height: CHIP_SIZE + 4,
            borderRadius: (CHIP_SIZE + 4) / 2,
            borderColor: ring,
            borderWidth: StyleSheet.hairlineWidth * 2,
            padding: 2,
          },
        ]}
      >
        <View
          style={[
            styles.face,
            {
              width: CHIP_SIZE,
              height: CHIP_SIZE,
              borderRadius: CHIP_SIZE / 2,
              backgroundColor: face,
            },
          ]}
        >
          <Text variant="caption" style={[styles.letter, { color: ring }]}>
            {letter}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  face: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    fontWeight: '600',
  },
});

export const QUICK_ACCESS_CHIP_SIZE = CHIP_SIZE;
