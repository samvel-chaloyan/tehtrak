import { StyleSheet } from 'react-native';

import { useLogout } from '@/features/auth/hooks/useAuth';
import { AppScreenProps } from '@/navigation/types';
import { appConfig } from '@/config/app';
import { useAppStore } from '@/store';
import {
  AppScreenShell,
  NotebookIndex,
  NotebookRow,
  Stack,
  Text,
  TextLink,
} from '@/shared/ui';
import { useTheme } from '@/theme';

export function SettingsScreen({ navigation }: AppScreenProps<'Settings'>) {
  const { spacing } = useTheme();
  const logout = useLogout();
  const user = useAppStore((s) => s.user);
  const displayName = user?.displayName?.trim() || 'Signed in';
  const email = user?.email?.trim() || 'Account';

  return (
    <AppScreenShell
      navigation={navigation}
      title="Settings"
      subtitle="Account"
      subtitleUnderline
      onBack={() => navigation.goBack()}
      scrollable
    >
      <Stack gap="lg" style={[styles.body, { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }]}>
        <NotebookIndex>
          <NotebookRow title={displayName} description={email} size="item" />
        </NotebookIndex>

        <Stack gap="sm">
          <Text variant="caption" color="tertiary">
            About
          </Text>
          <Text variant="body">{appConfig.name}</Text>
          <Text variant="bodySmall" color="secondary">
            {appConfig.tagline}
          </Text>
        </Stack>

        <TextLink label="Sign out" onPress={() => logout.mutate()} />
      </Stack>
    </AppScreenShell>
  );
}

const styles = StyleSheet.create({
  body: {
    width: '100%',
  },
});
