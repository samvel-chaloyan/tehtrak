import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { NotebookIndexFrame } from './NotebookIndex';
import { CORNER_ACCENT_STROKE, CornerAccent } from './CornerAccent';
import { ScreenMeta } from './ScreenMeta';
import { useSurfaceStyles, useTheme } from '@/theme';
import {
  entityAccentColor,
  type EntityAccent,
} from '@/theme/entityAccent';

export interface NotebookListShelfProps {
  countLabel: string;
  footerLeft?: ReactNode;
  children: ReactNode;
  /** When false, list sits on a grouped surface over the canvas. */
  framed?: boolean;
  countColor?: 'secondary' | 'tertiary';
  /**
   * Quiet top-left corner mark on the grouped list body —
   * workspace / collection / item entity accent.
   */
  accent?: EntityAccent;
  /**
   * When false, shelf sizes to its content (e.g. inside a ScrollView).
   * Default true for full-height list screens.
   */
  fill?: boolean;
}

/** List section — canvas behind, optional grouped surface. */
export function NotebookListShelf({
  countLabel,
  footerLeft,
  children,
  framed = true,
  countColor = 'secondary',
  accent,
  fill = true,
}: NotebookListShelfProps) {
  const { colors, radius, spacing, shadows } = useTheme();
  const surfaces = useSurfaceStyles();
  const accentColor = accent ? entityAccentColor(colors, accent) : null;
  /** Keep the outside L-stroke inside layout bounds (ScrollView clips overflow). */
  const accentInset = accentColor ? CORNER_ACCENT_STROKE : 0;

  const footerRow = (
    <View style={[styles.footerRow, { gap: spacing.sm }]}>
      {footerLeft ? <View style={styles.footerLeft}>{footerLeft}</View> : <View style={styles.footerLeft} />}
      <ScreenMeta
        label={countLabel}
        color={countColor}
        align="right"
        compact
        style={styles.footerMeta}
      />
    </View>
  );

  if (framed) {
    return (
      <View style={[styles.section, fill && styles.fill, surfaces.scroll]}>
        <NotebookIndexFrame>{children}</NotebookIndexFrame>
        <View style={[styles.externalFooter, { marginTop: spacing.md, gap: spacing.md }]}>
          {footerLeft ? <View style={styles.footerLeft}>{footerLeft}</View> : <View style={styles.footerLeft} />}
          <ScreenMeta label={countLabel} color={countColor} align="right" style={styles.footerMeta} />
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.section,
        fill && styles.fill,
        surfaces.scroll,
        accentInset > 0 && {
          paddingTop: accentInset,
          paddingLeft: accentInset,
        },
      ]}
    >
      <View
        style={[
          styles.groupedCardShadow,
          fill && styles.fill,
          shadows.soft,
          { borderRadius: radius.xl },
        ]}
      >
        {accentColor ? (
          <CornerAccent color={accentColor} surfaceRadius={radius.xl} />
        ) : null}
        <View
          style={[
            styles.groupedCard,
            fill && styles.fill,
            surfaces.grouped,
            { borderRadius: radius.xl },
          ]}
        >
          <View style={[styles.listHost, fill && styles.fill]}>{children}</View>
          <View
            style={[
              styles.inCardFooter,
              {
                borderTopColor: colors.border,
                paddingHorizontal: spacing.lg,
                paddingVertical: spacing.sm,
              },
            ]}
          >
            {footerRow}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    minHeight: 0,
  },
  fill: {
    flex: 1,
    minHeight: 0,
  },
  groupedCardShadow: {
    overflow: 'visible',
  },
  groupedCard: {
    overflow: 'hidden',
  },
  listHost: {
    minHeight: 0,
  },
  inCardFooter: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  externalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLeft: {
    flex: 1,
    flexShrink: 1,
  },
  footerMeta: {
    marginBottom: 0,
    flexShrink: 0,
  },
});
