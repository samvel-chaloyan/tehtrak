import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { NotebookIndexFrame } from './NotebookIndex';
import { ScreenMeta } from './ScreenMeta';
import { useSurfaceStyles, useTheme } from '@/theme';

export interface NotebookListShelfProps {
  countLabel: string;
  footerLeft?: ReactNode;
  children: ReactNode;
  /** When false, list sits on a grouped surface over the canvas. */
  framed?: boolean;
  countColor?: 'secondary' | 'tertiary';
}

/** List section — canvas behind, optional grouped surface. */
export function NotebookListShelf({
  countLabel,
  footerLeft,
  children,
  framed = true,
  countColor = 'secondary',
}: NotebookListShelfProps) {
  const { colors, radius, spacing, shadows } = useTheme();
  const surfaces = useSurfaceStyles();

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
      <View style={[styles.section, surfaces.scroll]}>
        <NotebookIndexFrame>{children}</NotebookIndexFrame>
        <View style={[styles.externalFooter, { marginTop: spacing.md, gap: spacing.md }]}>
          {footerLeft ? <View style={styles.footerLeft}>{footerLeft}</View> : <View style={styles.footerLeft} />}
          <ScreenMeta label={countLabel} color={countColor} align="right" style={styles.footerMeta} />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.section, surfaces.scroll]}>
      <View
        style={[
          styles.groupedCardShadow,
          shadows.soft,
          { borderRadius: radius.xl },
        ]}
      >
        <View
          style={[
            styles.groupedCard,
            surfaces.grouped,
            { borderRadius: radius.xl },
          ]}
        >
          <View style={styles.listHost}>{children}</View>
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
    flex: 1,
    minHeight: 0,
  },
  groupedCardShadow: {
    flex: 1,
    minHeight: 0,
  },
  groupedCard: {
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',
  },
  listHost: {
    flex: 1,
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
