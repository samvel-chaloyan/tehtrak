import { StyleSheet, View } from 'react-native';
import { AuthScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import { Button, Screen, Stack, Text } from '@/shared/ui';
import { appConfig } from '@/config/app';

export function WelcomeScreen({ navigation }: AuthScreenProps<'Welcome'>) {
  const { spacing } = useTheme();

  return (
    <Screen style={styles.screen}>
      <View style={styles.hero}>
        <Text variant="titleLarge" style={styles.brand}>
          {appConfig.name}
        </Text>
        <Text variant="body" color="secondary" style={styles.tagline}>
          {appConfig.tagline}
        </Text>
        <Text variant="bodySmall" color="tertiary" style={[styles.description, { marginTop: spacing.lg }]}>
          Structure everyday operations the way you already think — in notebooks, lists, and
          quiet notes. No dashboards. No jargon.
        </Text>
      </View>

      <Stack gap="sm" style={{ paddingBottom: spacing.lg }}>
        <Button label="Sign in" fullWidth onPress={() => navigation.navigate('Login')} />
        <Button
          label="Create account"
          variant="secondary"
          fullWidth
          onPress={() => navigation.navigate('Register')}
        />
      </Stack>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-between',
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 48,
  },
  brand: {
    marginBottom: 8,
  },
  tagline: {
    maxWidth: 280,
  },
  description: {
    lineHeight: 22,
    maxWidth: 320,
  },
});
