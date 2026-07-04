import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { typography } from '@/theme/typography';
import { useTheme } from '@/theme';

/** Shared brand logo dimensions — header button and drawer use the same size. */
export const BRAND_LOGO_SIZE = {
  width: 40,
  height: 30,
} as const;

export const BRAND_LOGO_TOUCH = 44;
export const BRAND_LOGO_MARGIN_LEFT = -6;

const HEADER_LINE_HEIGHT = 3;

/**
 * Brand layout anchors relative to the app shell (after shell paddingTop).
 * Prefer measuring the header logo slot at runtime; these are fallbacks.
 */
export function useBrandLogoAnchor() {
  const insets = useSafeAreaInsets();
  const { spacing } = useTheme();

  const rowTop = HEADER_LINE_HEIGHT + spacing.md;
  const touchLeft = spacing.lg + BRAND_LOGO_MARGIN_LEFT;
  const brandTextLeft = touchLeft + BRAND_LOGO_TOUCH + spacing.sm;
  const brandSubtitleTop = rowTop + BRAND_LOGO_TOUCH + spacing.xs;
  const menuTop =
    brandSubtitleTop + typography.bodySmall.lineHeight + spacing.lg;

  return {
    rowTop,
    touchLeft,
    brandTextLeft,
    brandSubtitleTop,
    menuTop,
    shellPaddingTop: insets.top + spacing.lg,
  };
}

/** Drawer brand text starts to the right of the measured logo touch target. */
export function brandTextLeftFromLogoTouch(logoLeft: number, spacingSm: number) {
  return logoLeft + BRAND_LOGO_TOUCH + spacingSm;
}
