import { useMemo } from 'react';
import { ViewStyle } from 'react-native';

import { useTheme } from './ThemeProvider';

/** Canonical background roles — always prefer these over raw hex. */
export function useSurfaceStyles() {
  const { colors } = useTheme();

  return useMemo(
    () => ({
      /** Full-screen canvas (#F5F5F7) */
      canvas: { backgroundColor: colors.background } satisfies ViewStyle,
      /** Grouped lists, inputs, modals, cards (#FFFFFF) */
      grouped: { backgroundColor: colors.surface } satisfies ViewStyle,
      /** Scroll views and list hosts — show canvas or grouped parent through */
      scroll: { backgroundColor: 'transparent' } satisfies ViewStyle,
    }),
    [colors.background, colors.surface],
  );
}
