import { StyleSheet, View } from 'react-native';

import { appConfig } from '@/config/app';
import { Text } from '@/shared/ui';
import { useTheme } from '@/theme';

/** Welcome brand hero — name in a quiet primary-border frame (token type only). */
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
          paddingVertical: spacing.lg,
        },
      ]}
      accessibilityRole="header"
      accessibilityLabel={appConfig.name}
    >
      <Text
        variant="display"
        color="accent"
        numberOfLines={1}
        style={styles.brandName}
      >
        {appConfig.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleBadge: {
    borderWidth: 2,
    alignSelf: 'center',
  },
  brandName: {
    textAlign: 'center',
    flexShrink: 0,
  },
});
