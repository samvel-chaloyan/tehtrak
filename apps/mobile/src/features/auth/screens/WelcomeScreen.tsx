import { appConfig } from '@/config/app';
import { AuthScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import { Button, PageTitle, Screen, Stack, Text, ThreeLines } from '@/shared/ui';

export function WelcomeScreen({ navigation }: AuthScreenProps<'Welcome'>) {
  const { spacing } = useTheme();

  return (
    <Screen scroll>
      <Stack gap="2xl" style={{ paddingTop: spacing.lg, paddingBottom: spacing.xl }}>
        <Stack gap="lg">
          <ThreeLines size="lg" align="left" />
          <Stack gap="sm">
            <PageTitle>{appConfig.name}</PageTitle>
            <Text variant="body" color="secondary">
              {appConfig.tagline}
            </Text>
          </Stack>
          <Text variant="bodySmall" color="secondary">
            Record and organize real-world operations — collections, items, and quiet notes in one
            calm place.
          </Text>
        </Stack>

        <Stack gap="sm">
          <Button label="Sign in" fullWidth onPress={() => navigation.navigate('Login')} />
          <Button
            label="Create account"
            variant="ghost"
            fullWidth
            onPress={() => navigation.navigate('Register')}
          />
        </Stack>
      </Stack>
    </Screen>
  );
}
