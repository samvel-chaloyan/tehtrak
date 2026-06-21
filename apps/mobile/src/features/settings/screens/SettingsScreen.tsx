import { AppScreenProps } from '@/navigation/types';
import { useLogout } from '@/features/auth/hooks/useAuth';
import { appConfig } from '@/config/app';
import { useTheme } from '@/theme';
import {
  NotebookIndex,
  NotebookRow,
  PageHeader,
  Screen,
  Stack,
  Text,
  TextLink,
} from '@/shared/ui';

export function SettingsScreen(_props: AppScreenProps<'Settings'>) {
  const { spacing } = useTheme();
  const logout = useLogout();

  return (
    <Screen scroll edges={['bottom']}>
      <PageHeader title="Settings" subtitle="Account and preferences." />

      <Stack gap="lg">
        <NotebookIndex>
          <NotebookRow
            title="Account"
            description="Signed in"
            size="item"
          />
          <NotebookRow
            title="Preferences"
            description="Coming soon"
            size="item"
            showDivider
          />
        </NotebookIndex>

        <Stack gap="sm" style={{ paddingTop: spacing.sm }}>
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
    </Screen>
  );
}