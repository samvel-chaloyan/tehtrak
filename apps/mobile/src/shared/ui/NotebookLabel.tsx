import { StyleSheet, View } from 'react-native';

import { RunningText } from './RunningText';
import { useTheme } from '@/theme';
import { typography } from '@/theme/typography';

/** Must match CONTEXT_BANNER_HEIGHT in ContextBanner. */
const CONTEXT_BAND_HEIGHT = 36;

/** @deprecated Use CONTEXT_BANNER_HEIGHT — kept for existing imports. */
export const NOTEBOOK_LABEL_SLOT_HEIGHT = 36;

/** Kept for imports; tuck is no longer applied (alignment stays on one line). */
export const NOTEBOOK_LABEL_OVERLAP = 'xs' as const;

/** How far the tab background tucks under the blue header. */
const HEADER_TUCK = 6;

/** Standard tab width before text runs. */
export function notebookLabelStandardWidth(spacing2xl: number, spacing3xl: number, spacingMd: number) {
  return spacing2xl + spacing3xl + spacingMd;
}

export interface NotebookLabelProps {
  label: string;
}

/**
 * Quiet paper tab on the context banner — flush right, tucked under the header.
 * Text shares the banner midline with the back chevron.
 */
export function NotebookLabel({ label }: NotebookLabelProps) {
  const { colors, radius, shadows, spacing } = useTheme();
  const horizontalPadding = spacing.md;
  const tabWidth = notebookLabelStandardWidth(spacing['2xl'], spacing['3xl'], spacing.md);
  const textAreaWidth = tabWidth - horizontalPadding * 2;

  return (
    <View style={[styles.slot, { width: tabWidth, height: CONTEXT_BAND_HEIGHT }]}>
      <View
        style={[
          styles.tabSurface,
          shadows.card,
          {
            top: -HEADER_TUCK,
            backgroundColor: colors.surface,
            borderBottomLeftRadius: radius.lg,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: radius.sm,
            borderTopRightRadius: 0,
          },
        ]}
      />
      <View
        style={[
          styles.textRow,
          {
            paddingHorizontal: horizontalPadding,
            minHeight: typography.bodySmall.lineHeight,
          },
        ]}
      >
        <RunningText
          text={label}
          color={colors.textSecondary}
          align="center"
          availableWidth={textAreaWidth}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slot: {
    justifyContent: 'center',
    overflow: 'visible',
  },
  tabSurface: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  textRow: {
    width: '100%',
    justifyContent: 'center',
    zIndex: 1,
  },
});
