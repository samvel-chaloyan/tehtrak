import { ReactNode, useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLogout } from '@/features/auth/hooks/useAuth';
import { AppStackParamList } from '@/navigation/types';
import { useSurfaceStyles, useTheme } from '@/theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppDrawer } from './AppDrawer';
import { BrandMenuButton } from './BrandMenuButton';
import {
  BRAND_HEADER_PADDING_Y,
  BRAND_LOGO_MARGIN_LEFT,
  brandTextLeftFromLogoTouch,
} from './brandLogoLayout';
import { FixedFooterFrame } from './FixedFooterFrame';
import {
  CONTEXT_BANNER_HEIGHT,
  CONTEXT_CAPSULE_GAP,
  CONTEXT_CAPSULE_HEIGHT,
  ContextBanner,
  DEFAULT_CONTEXT_BANNER_MESSAGES,
  type ContextRecentPlace,
} from './ContextBanner';
import { KeyboardDismissView } from './KeyboardDismissView';
import { ScreenLineHeader, type ScreenLineHeaderTone } from './ScreenLineHeader';
import { ShellBackLink } from './ShellBackLink';
import { useScreenContentHeight } from './useScreenContentHeight';

export interface AppScreenShellProps {
  navigation: Pick<NativeStackNavigationProp<AppStackParamList>, 'navigate' | 'goBack'>;
  title: string;
  /** Nested context label inside the soft nav capsule. */
  subtitle?: string;
  subtitleUnderline?: boolean;
  /** Ambient rotating messages for root screens without recent places. */
  bannerMessages?: readonly string[];
  /** @deprecated Prefer bannerMessages. */
  infoMessage?: string;
  onBack?: () => void;
  /** Scoped page search — shown in the nav / places capsule when provided. */
  onSearch?: () => void;
  /** Root Workspaces — story-style recent places in the soft capsule. */
  recentPlaces?: ContextRecentPlace[];
  /** Inline capsule search field (frees recent circles / context label). */
  searchActive?: boolean;
  searchQuery?: string;
  searchPlaceholder?: string;
  onSearchQueryChange?: (query: string) => void;
  onSearchCancel?: () => void;
  footer?: ReactNode;
  scrollable?: boolean;
  headerTone?: ScreenLineHeaderTone;
  children: ReactNode;
}

export function AppScreenShell({
  navigation,
  title,
  subtitle,
  subtitleUnderline,
  bannerMessages,
  infoMessage,
  onBack,
  onSearch,
  recentPlaces,
  searchActive,
  searchQuery,
  searchPlaceholder,
  onSearchQueryChange,
  onSearchCancel,
  footer,
  scrollable = false,
  headerTone = 'brand',
  children,
}: AppScreenShellProps) {
  const { colors, radius, spacing, shadows } = useTheme();
  const surfaces = useSurfaceStyles();
  const insets = useSafeAreaInsets();
  const contentHeight = useScreenContentHeight();
  const shellRef = useRef<View>(null);
  const logoSlotRef = useRef<View>(null);
  const [logoPosition, setLogoPosition] = useState<{ top: number; left: number } | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const logout = useLogout();
  const isBrandHeader = headerTone === 'brand';
  const frameRadius = radius.xl;
  const showContextCapsule = Boolean(
    onBack || subtitle || recentPlaces !== undefined || searchActive,
  );
  const ambientMessages =
    bannerMessages ??
    (infoMessage ? [infoMessage] : DEFAULT_CONTEXT_BANNER_MESSAGES);
  const contextSlotHeight = showContextCapsule
    ? CONTEXT_CAPSULE_HEIGHT + CONTEXT_CAPSULE_GAP * 2
    : CONTEXT_BANNER_HEIGHT;

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
          left: isBrandHeader ? left : left + BRAND_LOGO_MARGIN_LEFT,
          top,
        });
      },
      () => {},
    );
  }, [isBrandHeader]);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((open) => !open);
  }, []);

  const brandTextLeft = logoPosition
    ? brandTextLeftFromLogoTouch(logoPosition.left, spacing.sm)
    : undefined;

  const pageBody = scrollable ? (
    <ScrollView
      style={[styles.scroll, surfaces.scroll]}
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

  const header = (
    <ScreenLineHeader
      title={title}
      subtitle={isBrandHeader ? undefined : subtitle}
      subtitleUnderline={isBrandHeader ? undefined : subtitleUnderline}
      tone={headerTone}
      contextLeading={
        !isBrandHeader && onBack ? <ShellBackLink onPress={onBack} /> : undefined
      }
      logoSlotRef={logoSlotRef}
      onLogoSlotLayout={measureLogoSlot}
      onMenuPress={isBrandHeader ? toggleDrawer : undefined}
      menuLogoVariant="white"
    />
  );

  return (
    <KeyboardDismissView style={[styles.shell, surfaces.canvas]}>
      {isBrandHeader ? <StatusBar style="light" /> : null}
      <View
        ref={shellRef}
        collapsable={false}
        style={[styles.shellInner, surfaces.scroll, { height: contentHeight }]}
      >
        {isBrandHeader ? (
            <View
              style={[
                styles.pageChrome,
                { marginBottom: showContextCapsule ? 0 : spacing.md },
              ]}
            >
              <View
                style={[
                  styles.brandHeaderCard,
                  shadows.raised,
                  {
                    backgroundColor: colors.primary,
                    borderBottomLeftRadius: frameRadius,
                    borderBottomRightRadius: 0,
                    paddingTop: insets.top + spacing.md,
                    paddingBottom: spacing[BRAND_HEADER_PADDING_Y],
                    paddingHorizontal: spacing.lg,
                    zIndex: 3,
                  },
                ]}
              >
                {header}
              </View>
              <View style={[styles.contextBannerSlot, { minHeight: contextSlotHeight }]}>
                <ContextBanner
                  messages={showContextCapsule ? undefined : ambientMessages}
                  contextLabel={subtitle}
                  onBack={onBack}
                  onSearch={onSearch}
                  recentPlaces={recentPlaces}
                  searchActive={searchActive}
                  searchQuery={searchQuery}
                  searchPlaceholder={searchPlaceholder}
                  onSearchQueryChange={onSearchQueryChange}
                  onSearchCancel={onSearchCancel}
                />
              </View>
            </View>
        ) : (
          <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.lg }}>{header}</View>
        )}

        <FixedFooterFrame footer={footer}>
          <View style={[styles.main, surfaces.scroll]}>{pageBody}</View>
        </FixedFooterFrame>

        <AppDrawer
          visible={drawerOpen}
          headerTone={headerTone}
          brandLogoLeft={logoPosition?.left}
          brandTextLeft={brandTextLeft}
          brandRowTop={logoPosition?.top}
          onClose={() => setDrawerOpen(false)}
          onSettings={() => navigation.navigate('Settings')}
          onSignOut={() => logout.mutate()}
        />

        {logoPosition && !isBrandHeader ? (
          <BrandMenuButton
            fixed
            onPress={toggleDrawer}
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
    overflow: 'visible',
  },
  shellInner: {
    flex: 1,
    overflow: 'visible',
  },
  pageChrome: {
    width: '100%',
    overflow: 'visible',
    zIndex: 2,
  },
  brandHeaderCard: {
    width: '100%',
  },
  contextBannerSlot: {
    width: '100%',
    overflow: 'visible',
    zIndex: 1,
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
