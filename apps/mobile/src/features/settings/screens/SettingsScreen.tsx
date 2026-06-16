import { StyleSheet, View } from 'react-native';
import { useLogout } from '@/features/auth/hooks/useAuth';
import { AppScreenProps } from '@/navigation/types';
import { appConfig } from '@/config/app';
import { useTheme } from '@/theme';
import { PageHeader, Screen, Stack, Text, TextLink } from '@/shared/ui';

export function SettingsScreen(_props: AppScreenProps<'Settings'>) {
  const { colors, radius, spacing } = useTheme();
  const logout = useLogout();

  return (
    <Screen scroll edges={['bottom']}>
      <PageHeader title="Settings" subtitle="Account and preferences." />

      <Stack gap="lg">
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: radius.lg,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: colors.border,
          }}
        >
          <SettingsRow label="Account" hint="Signed in" />
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: colors.border,
              marginLeft: spacing.lg,
            }}
          />
          <SettingsRow label="Preferences" hint="Coming soon" />
        </View>

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
    </Screen>
  );
}

function SettingsRow({ label, hint }: { label: string; hint: string }) {
  const { spacing } = useTheme();

  return (
    <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: spacing.xs }}>
      <Text variant="subtitle">{label}</Text>
      <Text variant="caption" color="tertiary">
        {hint}
      </Text>
    </View>
  );
}
