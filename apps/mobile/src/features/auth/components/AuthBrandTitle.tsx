import { StyleSheet } from 'react-native';

import { appConfig } from '@/config/app';
import { Stack, Text, ThreeLines } from '@/shared/ui';

/** Welcome brand hero — ThreeLines + token title (no off-scale sizes). */
export function AuthBrandTitle() {
  return (
    <Stack gap="lg" align="center">
      <ThreeLines size="lg" align="center" />
      <Text variant="titleLarge" color="accent" style={styles.brandName}>
        {appConfig.name}
      </Text>
    </Stack>
  );
}

const styles = StyleSheet.create({
  brandName: {
    textAlign: 'center',
  },
});
