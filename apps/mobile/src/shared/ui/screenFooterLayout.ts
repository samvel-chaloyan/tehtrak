import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

/** Primary bottom action height — matches OutlineButton full size. */
export const BOTTOM_BUTTON_HEIGHT = 52;

export type ScreenFooterButtonCount = 1 | 2;

export function useScreenFooterLayout(buttonCount: ScreenFooterButtonCount = 1) {
  const insets = useSafeAreaInsets();
  const { spacing } = useTheme();

  const horizontalPadding = spacing.lg;
  const topPadding = spacing.md;
  const bottomInset = insets.bottom + spacing.xl;

  const buttonStackHeight =
    buttonCount === 1
      ? BOTTOM_BUTTON_HEIGHT
      : BOTTOM_BUTTON_HEIGHT * 2 + spacing.md;

  const slotHeight = buttonStackHeight + topPadding + bottomInset;

  return {
    horizontalPadding,
    topPadding,
    bottomInset,
    slotHeight,
    buttonStackHeight,
  };
}
