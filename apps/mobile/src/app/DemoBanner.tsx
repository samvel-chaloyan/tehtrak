import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isDemoMode } from '@/config/demo';
import { Text } from '@/shared/ui';
import { useTheme } from '@/theme';

export function DemoBanner() {
  const insets = useSafeAreaInsets();
  const { colors, spacing } = useTheme();

  if (!isDemoMode || !__DEV__) {
    return null;
  }

  return (
    <View
      pointerEvents="none"
      style={[
        styles.banner,
        {
          top: insets.top,
          backgroundColor: colors.primaryMuted,
          borderBottomColor: colors.primary,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.xs,
        },
      ]}
    >
      <Text variant="caption" color="accent" style={styles.text}>
        Demo Mode · Backend disabled
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1000,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
