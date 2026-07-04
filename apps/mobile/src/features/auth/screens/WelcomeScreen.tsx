import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthBrandTitle } from '@/features/auth/components/AuthBrandTitle';
import { AuthFooter } from '@/features/auth/components/AuthScreenLayout';
import { appConfig } from '@/config/app';
import { AuthScreenProps } from '@/navigation/types';
import { FixedFooterFrame } from '@/shared/ui/FixedFooterFrame';
import { KeyboardDismissView } from '@/shared/ui/KeyboardDismissView';
import { useScreenContentHeight } from '@/shared/ui/useScreenContentHeight';
import { Stack, Text } from '@/shared/ui';
import { useTheme } from '@/theme';

const WELCOME_LINES = [
  appConfig.tagline,
  'Record what matters in your work',
  'Organize it into sections you trust',
  'Return whenever you need clarity',
] as const;

export function WelcomeScreen({ navigation }: AuthScreenProps<'Welcome'>) {
  const { colors, spacing } = useTheme();
  const insets = useSafeAreaInsets();
  const contentHeight = useScreenContentHeight();

  return (
    <KeyboardDismissView
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          paddingTop: insets.top + spacing.lg,
        },
      ]}
    >
      <View style={[styles.frame, { height: contentHeight }]}>
        <FixedFooterFrame
          buttonCount={2}
          footer={
            <AuthFooter
              config={{
                mode: 'dual',
                primaryAction: {
                  label: 'Sign in',
                  onPress: () => navigation.navigate('Login'),
                },
                secondaryAction: {
                  label: 'Create account',
                  onPress: () => navigation.navigate('Register'),
                },
              }}
            />
          }
        >
          <View style={styles.hero}>
            <Stack gap="xl" align="center">
              <AuthBrandTitle />

              <Stack gap="xs" align="center" style={styles.copy}>
                {WELCOME_LINES.map((line, index) => (
                  <Text
                    key={line}
                    variant={index === 0 ? 'body' : 'bodySmall'}
                    color="secondary"
                    style={styles.line}
                  >
                    {line}
                  </Text>
                ))}
              </Stack>
            </Stack>
          </View>
        </FixedFooterFrame>
      </View>
    </KeyboardDismissView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  frame: {
    overflow: 'hidden',
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
  },
  copy: {
    maxWidth: 280,
  },
  line: {
    textAlign: 'center',
  },
});
