import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from './Text';
import { BRAND_LOGO_MARGIN_LEFT } from './brandLogoLayout';
import { useTheme } from '@/theme';

export interface ShellBackLinkProps {
  onPress: () => void;
  label?: string;
}

export function ShellBackLink({ onPress, label = 'Back' }: ShellBackLinkProps) {
  const { colors, spacing } = useTheme();

  return (
    <View style={[styles.wrap, { gap: spacing.xs, marginLeft: BRAND_LOGO_MARGIN_LEFT }]}>
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
      <View style={[styles.line, { backgroundColor: colors.primaryBorder }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'flex-start',
    alignItems: 'stretch',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: 1,
    borderRadius: 999,
    alignSelf: 'stretch',
  },
});
