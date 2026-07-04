import { StyleSheet, View } from 'react-native';

import { appConfig } from '@/config/app';
import { Text } from '@/shared/ui';
import { useTheme } from '@/theme';

export function AuthBrandTitle() {
  const { colors, radius, spacing } = useTheme();

  return (
    <View
      style={[
        styles.titleBadge,
        {
          borderColor: colors.primary,
          backgroundColor: colors.surface,
          borderRadius: radius.lg,
          paddingHorizontal: spacing.xl,
          paddingVertical: spacing.md,
        },
      ]}
    >
      <Text variant="titleLarge" color="accent" style={styles.brandName}>
        {appConfig.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleBadge: {
    borderWidth: 2,
  },
  brandName: {
    textAlign: 'center',
    fontSize: 68,
    lineHeight: 76,
    fontWeight: '600',
    letterSpacing: -1.6,
  },
});
