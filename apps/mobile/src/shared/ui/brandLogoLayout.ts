import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { typography } from '@/theme/typography';
import { useTheme } from '@/theme';

import type { ScreenLineHeaderTone } from './ScreenLineHeader';

/** Shared brand logo dimensions — header button and drawer use the same size. */
export const BRAND_LOGO_SIZE = {
  width: 40,
  height: 30,
} as const;

export const BRAND_LOGO_TOUCH = 44;
export const BRAND_LOGO_MARGIN_LEFT = -6;
/** Vertical padding inside the brand header card. */
export const BRAND_HEADER_PADDING_Y = 'list' as const;
/** Horizontal padding inside the brand header card. */
export const BRAND_HEADER_PADDING_X = 'md' as const;
/** Outer screen inset matching the brand header wrap. */
export const BRAND_CARD_WRAP_PADDING = 'lg' as const;

/** Inner content inset from screen edge — wrap + card padding (back link, context subtitle). */
export function brandCardContentInset(spacingLg: number, spacingMd: number) {
  return spacingLg + spacingMd;
}

const HEADER_LINE_HEIGHT = 3;

/**
 * Brand layout anchors relative to the app shell (after shell paddingTop).
 * Prefer measuring the header logo slot at runtime; these are fallbacks.
 */
export function useBrandLogoAnchor(headerTone: ScreenLineHeaderTone = 'brand') {
  const insets = useSafeAreaInsets();
  const { spacing } = useTheme();
  const isBrandHeader = headerTone === 'brand';

  const brandCardPaddingY = spacing[BRAND_HEADER_PADDING_Y];
  const brandCardPaddingX = spacing[BRAND_HEADER_PADDING_X];
  const rowTop = isBrandHeader
    ? insets.top + spacing.md + brandCardPaddingY
    : HEADER_LINE_HEIGHT + spacing.md;
  const touchLeft = isBrandHeader
    ? spacing[BRAND_CARD_WRAP_PADDING] + brandCardPaddingX
    : spacing.lg + BRAND_LOGO_MARGIN_LEFT;
  const brandTextLeft = touchLeft + BRAND_LOGO_SIZE.width + spacing.sm;
  const brandSubtitleTop = rowTop + BRAND_LOGO_SIZE.height + spacing.xs;
  const menuTop =
    brandSubtitleTop + typography.bodySmall.lineHeight + spacing.lg;

  return {
    rowTop,
    touchLeft,
    brandTextLeft,
    brandSubtitleTop,
    menuTop,
    shellPaddingTop: isBrandHeader
      ? insets.top + spacing.md
      : insets.top + spacing.lg,
  };
}

/** Drawer brand text starts to the right of the measured logo. */
export function brandTextLeftFromLogoTouch(logoLeft: number, spacingSm: number) {
  return logoLeft + BRAND_LOGO_SIZE.width + spacingSm;
}
