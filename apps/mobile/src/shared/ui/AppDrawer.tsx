import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState, type ComponentProps } from 'react';
import { BackHandler, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { appConfig } from '@/config/app';
import { BrandLogoImage } from './BrandLogoImage';
import { BRAND_LOGO_SIZE, useBrandLogoAnchor } from './brandLogoLayout';
import type { ScreenLineHeaderTone } from './ScreenLineHeader';
import { Text } from './Text';
import { useTheme } from '@/theme';
import { typography } from '@/theme/typography';

export interface AppDrawerProps {
  visible: boolean;
  onClose: () => void;
  headerTone?: ScreenLineHeaderTone;
  /** Measured from the header logo slot when available */
  brandLogoLeft?: number;
  brandTextLeft?: number;
  brandRowTop?: number;
  onSettings?: () => void;
  onSignOut?: () => void;
  onSearch?: () => void;
  onFavorites?: () => void;
  onRecent?: () => void;
  onHelp?: () => void;
  onAbout?: () => void;
}

const DRAWER_WIDTH = 300;
const OPEN_DURATION = 250;
const CLOSE_DURATION = 200;

type DrawerIconName = ComponentProps<typeof Ionicons>['name'];

interface DrawerRowProps {
  icon: DrawerIconName;
  label: string;
  onPress: () => void;
}

function DrawerDivider() {
  const { colors, spacing } = useTheme();

  return (
    <View
      style={[
        styles.divider,
        {
          backgroundColor: colors.border,
          marginVertical: spacing.md,
        },
      ]}
    />
  );
}

function DrawerRow({ icon, label, onPress }: DrawerRowProps) {
  const { colors, radius, spacing } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        {
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.sm,
          borderRadius: radius.md,
          backgroundColor: pressed ? colors.primaryMuted : 'transparent',
          gap: spacing.md,
        },
      ]}
    >
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text variant="body" color="secondary" style={styles.rowLabel}>
        {label}
      </Text>
    </Pressable>
  );
}

export function AppDrawer({
  visible,
  onClose,
  headerTone = 'brand',
  brandLogoLeft: brandLogoLeftProp,
  brandTextLeft: brandTextLeftProp,
  brandRowTop: brandRowTopProp,
  onSettings,
  onSignOut,
  onSearch,
  onFavorites,
  onRecent,
  onHelp,
  onAbout,
}: AppDrawerProps) {
  const { colors, spacing } = useTheme();
  const insets = useSafeAreaInsets();
  const { rowTop, touchLeft, brandTextLeft: fallbackBrandTextLeft } =
    useBrandLogoAnchor(headerTone);
  const brandLogoLeft = brandLogoLeftProp ?? touchLeft;
  const brandTextLeft = brandTextLeftProp ?? fallbackBrandTextLeft;
  const brandRowTop = brandRowTopProp ?? rowTop;
  const brandRowHeight = Math.max(BRAND_LOGO_SIZE.height, typography.titleLarge.lineHeight);
  const menuTop = brandRowTop + brandRowHeight + spacing.lg;
  const [overlayVisible, setOverlayVisible] = useState(visible);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      setOverlayVisible(true);
      progress.value = withTiming(1, {
        duration: OPEN_DURATION,
        easing: Easing.out(Easing.cubic),
      });
      return;
    }

    progress.value = withTiming(
      0,
      {
        duration: CLOSE_DURATION,
        easing: Easing.in(Easing.cubic),
      },
      (finished) => {
        if (finished) {
          runOnJS(setOverlayVisible)(false);
        }
      },
    );
  }, [visible, progress]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });

    return () => subscription.remove();
  }, [visible, onClose]);

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -DRAWER_WIDTH + progress.value * DRAWER_WIDTH }],
  }));

  const scrimStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  const runAction = (action?: () => void) => {
    onClose();
    action?.();
  };

  if (!overlayVisible) {
    return null;
  }

  return (
    <View style={styles.root} pointerEvents="box-none">
      <Animated.View
        style={[
          styles.panel,
          panelStyle,
          {
            width: DRAWER_WIDTH,
            backgroundColor: colors.background,
            paddingBottom: insets.bottom + spacing.lg,
          },
        ]}
      >
        <View
          style={[
            styles.brandLogo,
            {
              top: brandRowTop + (brandRowHeight - BRAND_LOGO_SIZE.height) / 2,
              left: brandLogoLeft,
              width: BRAND_LOGO_SIZE.width,
              height: BRAND_LOGO_SIZE.height,
            },
          ]}
        >
          <BrandLogoImage />
        </View>

        <View
          style={[
            styles.brandTitleRow,
            {
              top: brandRowTop,
              left: brandTextLeft,
              height: brandRowHeight,
              paddingRight: spacing.lg,
            },
          ]}
        >
          <Text variant="titleLarge" color="accent" numberOfLines={1}>
            {appConfig.name}
          </Text>
        </View>

        <View style={[styles.menu, { paddingTop: menuTop, paddingHorizontal: spacing.lg }]}>
          <DrawerDivider />

          <DrawerRow icon="search-outline" label="Search" onPress={() => runAction(onSearch)} />
          <DrawerRow icon="star-outline" label="Favorites" onPress={() => runAction(onFavorites)} />
          <DrawerRow icon="time-outline" label="Recent" onPress={() => runAction(onRecent)} />

          <DrawerDivider />

          <DrawerRow
            icon="settings-outline"
            label="Settings"
            onPress={() => runAction(onSettings)}
          />
          <DrawerRow icon="help-circle-outline" label="Help" onPress={() => runAction(onHelp)} />
          <DrawerRow
            icon="information-circle-outline"
            label="About"
            onPress={() => runAction(onAbout)}
          />

          <DrawerDivider />

          <DrawerRow icon="log-out-outline" label="Sign out" onPress={() => runAction(onSignOut)} />
        </View>
      </Animated.View>

      <Animated.View style={[styles.scrimWrap, scrimStyle]}>
        <Pressable
          style={[styles.scrim, { backgroundColor: colors.overlay }]}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close menu"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    zIndex: 50,
  },
  panel: {
    height: '100%',
    zIndex: 2,
  },
  brandLogo: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitleRow: {
    position: 'absolute',
    justifyContent: 'center',
  },
  menu: {
    flex: 1,
  },
  divider: {
    height: 1,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLabel: {
    flex: 1,
  },
  scrimWrap: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
  scrim: {
    flex: 1,
  },
});
