import { ReactNode, useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLogout } from '@/features/auth/hooks/useAuth';
import { AppStackParamList } from '@/navigation/types';
import { useTheme } from '@/theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppDrawer } from './AppDrawer';
import { BrandMenuButton } from './BrandMenuButton';
import {
  BRAND_LOGO_MARGIN_LEFT,
  brandTextLeftFromLogoTouch,
} from './brandLogoLayout';
import { FixedFooterFrame } from './FixedFooterFrame';
import { KeyboardDismissView } from './KeyboardDismissView';
import { ScreenLineHeader } from './ScreenLineHeader';
import { ShellBackLink } from './ShellBackLink';
import { useScreenContentHeight } from './useScreenContentHeight';

export interface AppScreenShellProps {
  navigation: Pick<NativeStackNavigationProp<AppStackParamList>, 'navigate' | 'goBack'>;
  title: string;
  subtitle?: string;
  subtitleUnderline?: boolean;
  onBack?: () => void;
  footer?: ReactNode;
  scrollable?: boolean;
  children: ReactNode;
}

export function AppScreenShell({
  navigation,
  title,
  subtitle,
  subtitleUnderline,
  onBack,
  footer,
  scrollable = false,
  children,
}: AppScreenShellProps) {
  const { colors, spacing } = useTheme();
  const insets = useSafeAreaInsets();
  const contentHeight = useScreenContentHeight();
  const shellRef = useRef<View>(null);
  const logoSlotRef = useRef<View>(null);
  const [logoPosition, setLogoPosition] = useState<{ top: number; left: number } | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const logout = useLogout();

  const measureLogoSlot = useCallback(() => {
    const shell = shellRef.current;
    const slot = logoSlotRef.current;
    if (!shell || !slot) {
      return;
    }

    slot.measureLayout(
      shell,
      (left, top) => {
        setLogoPosition({
          left: left + BRAND_LOGO_MARGIN_LEFT,
          top,
        });
      },
      () => {},
    );
  }, []);

  const brandTextLeft = logoPosition
    ? brandTextLeftFromLogoTouch(logoPosition.left, spacing.sm)
    : undefined;

  const content = scrollable ? (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      automaticallyAdjustKeyboardInsets={false}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    children
  );

  return (
    <KeyboardDismissView
      style={[
        styles.shell,
        {
          backgroundColor: colors.surface,
          paddingTop: insets.top + spacing.lg,
        },
      ]}
    >
      <View
        ref={shellRef}
        collapsable={false}
        style={[styles.shellInner, { height: contentHeight }]}
      >
        <View style={{ paddingHorizontal: spacing.lg }}>
          <ScreenLineHeader
            title={title}
            subtitle={subtitle}
            subtitleUnderline={subtitleUnderline}
            contextLeading={onBack ? <ShellBackLink onPress={onBack} /> : undefined}
            logoSlotRef={logoSlotRef}
            onLogoSlotLayout={measureLogoSlot}
          />
        </View>

        <FixedFooterFrame footer={footer}>
          <View style={styles.main}>{content}</View>
        </FixedFooterFrame>

        <AppDrawer
          visible={drawerOpen}
          brandLogoLeft={logoPosition?.left}
          brandTextLeft={brandTextLeft}
          brandRowTop={logoPosition?.top}
          onClose={() => setDrawerOpen(false)}
          onSettings={() => navigation.navigate('Settings')}
          onSignOut={() => logout.mutate()}
        />

        {logoPosition ? (
          <BrandMenuButton
            fixed
            onPress={() => setDrawerOpen((open) => !open)}
            style={[styles.fixedLogo, logoPosition]}
          />
        ) : null}
      </View>
    </KeyboardDismissView>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    overflow: 'hidden',
  },
  shellInner: {
    overflow: 'hidden',
  },
  main: {
    flex: 1,
    minHeight: 0,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  fixedLogo: {
    position: 'absolute',
    zIndex: 100,
  },
});
