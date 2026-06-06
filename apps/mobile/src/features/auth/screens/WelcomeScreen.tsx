import { StyleSheet, View } from 'react-native';
import { appConfig } from '@/config/app';
import { AuthScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import { Button, PageTitle, Screen, Stack, Text, ThreeLines } from '@/shared/ui';

export function WelcomeScreen({ navigation }: AuthScreenProps<'Welcome'>) {
  const { spacing } = useTheme();

  return (
    <Screen style={styles.screen}>
      <View style={[styles.hero, { paddingTop: spacing['2xl'] }]}>
        <ThreeLines size="lg" align="left" style={{ marginBottom: spacing.lg }} />
        <PageTitle>{appConfig.name}</PageTitle>
        <Text variant="body" color="secondary" style={styles.tagline}>
          {appConfig.tagline}
        </Text>
        <Text variant="bodySmall" color="secondary" style={{ marginTop: spacing.lg, lineHeight: 22 }}>
          Record and organize the work you already track — in notebooks, lists, and quiet notes.
          Calm, simple, and built for real operations.
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
  },
  tagline: {
    maxWidth: 280,
  },
});
