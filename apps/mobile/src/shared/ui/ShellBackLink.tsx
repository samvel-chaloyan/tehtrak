import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Text } from './Text';
import { BRAND_LOGO_MARGIN_LEFT } from './brandLogoLayout';
import { useTheme } from '@/theme';

export interface ShellBackLinkProps {
  onPress: () => void;
  label?: string;
  /** Align flush with card inner edge — no logo offset margin */
  alignToCard?: boolean;
  /** Chevron only — soft nav capsule under the brand header */
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function ShellBackLink({
  onPress,
  label = 'Back',
  alignToCard = false,
  compact = false,
  style,
}: ShellBackLinkProps) {
  const { colors } = useTheme();

  if (compact) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={8}
        onPress={onPress}
        style={({ pressed }) => [
          styles.compactButton,
          style,
          { opacity: pressed ? 0.7 : 1 },
        ]}
      >
        <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
      </Pressable>
    );
  }

  return (
    <View style={[!alignToCard && { marginLeft: BRAND_LOGO_MARGIN_LEFT }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={8}
        onPress={onPress}
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.75 : 1 }]}
      >
        <Ionicons name="chevron-back" size={20} color={colors.primary} />
        <Text variant="bodySmall" color="secondary">
          {label}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  compactButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
