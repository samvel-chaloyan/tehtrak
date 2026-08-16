import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthPageHeader } from '@/features/auth/components/AuthPageHeader';
import { OutlineButton, OutlineButtonProps } from '@/shared/ui/OutlineButton';
import { AppStatusBar } from '@/shared/ui/AppStatusBar';
import { FixedFooterFrame } from '@/shared/ui/FixedFooterFrame';
import { KeyboardDismissView } from '@/shared/ui/KeyboardDismissView';
import { useScreenContentHeight } from '@/shared/ui/useScreenContentHeight';
import { Stack, Text } from '@/shared/ui';
import { useSurfaceStyles, useTheme } from '@/theme';

export interface AuthFooterAction extends Omit<OutlineButtonProps, 'label'> {
  label: string;
}

export type AuthFooterConfig =
  | {
      mode: 'dual';
      primaryAction: AuthFooterAction;
      secondaryAction: AuthFooterAction;
    }
  | {
      mode: 'single';
      action: AuthFooterAction;
    };

interface AuthFooterProps {
  config: AuthFooterConfig;
}

export function AuthFooter({ config }: AuthFooterProps) {
  if (config.mode === 'dual') {
    return (
      <Stack gap="md">
        <OutlineButton {...config.primaryAction} />
        <OutlineButton {...config.secondaryAction} />
      </Stack>
    );
  }

  return <OutlineButton {...config.action} />;
}

interface AuthScreenLayoutProps {
  children: ReactNode;
  headerTitle: string;
  onBack: () => void;
  /** Quiet line under the title — gives the form a place to land. */
  subtitle?: string;
  scroll?: boolean;
  footer: AuthFooterConfig;
}

export function AuthScreenLayout({
  children,
  headerTitle,
  onBack,
  subtitle,
  scroll = false,
  footer,
}: AuthScreenLayoutProps) {
  const { colors, radius, spacing, shadows } = useTheme();
  const surfaces = useSurfaceStyles();
  const insets = useSafeAreaInsets();
  const contentHeight = useScreenContentHeight();
  const buttonCount = footer.mode === 'dual' ? 2 : 1;

  const body = (
    <View style={[styles.body, { gap: spacing.lg }]}>
      <AuthPageHeader title={headerTitle} onBack={onBack} />
      {subtitle ? (
        <Text variant="bodySmall" color="secondary" style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
      <View
        style={[
          styles.formCard,
          shadows.soft,
          surfaces.grouped,
          {
            borderRadius: radius.xl,
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.lg,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );

  return (
    <KeyboardDismissView
      style={[
        styles.root,
        {
          backgroundColor: colors.surface,
          paddingTop: insets.top + spacing.lg,
        },
      ]}
    >
      <AppStatusBar tone="canvas" />
      <View style={[styles.frame, surfaces.scroll, { height: contentHeight }]}>
        <FixedFooterFrame footer={<AuthFooter config={footer} />} buttonCount={buttonCount}>
          {scroll ? (
            <ScrollView
              style={[styles.flex, surfaces.scroll]}
              contentContainerStyle={[
                styles.scrollContent,
                { paddingBottom: spacing.md },
              ]}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
              automaticallyAdjustKeyboardInsets={false}
              showsVerticalScrollIndicator={false}
            >
              {body}
            </ScrollView>
          ) : (
            <View style={[styles.flex, surfaces.scroll]}>{body}</View>
          )}
        </FixedFooterFrame>
      </View>
    </KeyboardDismissView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
  frame: {
    overflow: 'hidden',
  },
  flex: {
    flex: 1,
    minHeight: 0,
  },
  body: {
    flexGrow: 1,
    width: '100%',
  },
  subtitle: {
    maxWidth: 320,
  },
  formCard: {
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
  },
});
