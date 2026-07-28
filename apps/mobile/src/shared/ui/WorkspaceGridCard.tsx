import { useRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from './Text';
import { useTheme } from '@/theme';
import { typography } from '@/theme/typography';

/** Fixed height — every grid tile is identical. */
export const WORKSPACE_GRID_CARD_HEIGHT = 148;

/** Window coordinates for anchoring the long-press focus menu. */
export interface CardAnchorLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Corner accent stroke — quiet Tehtrak identity on each place card. */
const ACCENT_STROKE = 3;
/** Straight run past the curve along top + left. */
const ACCENT_EXTEND = 14;

const TITLE_LINES = 2;
const META_LINES = 2;

export interface WorkspaceGridCardProps {
  title: string;
  metaLines: string[];
  onPress?: () => void;
  /** Long-press receives the card's window layout for the focus menu. */
  onLongPress?: (layout: CardAnchorLayout) => void;
}

/**
 * Outside top-left accent as one continuous L-stroke (rounded corner).
 * Single View — no separate arc/arm pieces that can look cut.
 */
function CornerAccent({ color, cardRadius }: { color: string; cardRadius: number }) {
  const outerR = cardRadius + ACCENT_STROKE;
  const arm = outerR + ACCENT_EXTEND;

  return (
    <View
      pointerEvents="none"
      style={[
        styles.cornerAccent,
        {
          top: -ACCENT_STROKE,
          left: -ACCENT_STROKE,
          width: arm,
          height: arm,
          borderTopWidth: ACCENT_STROKE,
          borderLeftWidth: ACCENT_STROKE,
          borderTopColor: color,
          borderLeftColor: color,
          borderTopLeftRadius: outerR,
        },
      ]}
    />
  );
}

/**
 * Place card for the workspace grid — calm, typography-led,
 * with a primary accent hugging the outside of the top-left corner.
 */
export function WorkspaceGridCard({
  title,
  metaLines,
  onPress,
  onLongPress,
}: WorkspaceGridCardProps) {
  const { colors, radius, shadows, spacing } = useTheme();
  const rootRef = useRef<View>(null);
  const titleBlockHeight = typography.bodySmall.lineHeight * TITLE_LINES;
  const metaBlockHeight = typography.caption.lineHeight * META_LINES + spacing.xs;

  const handleLongPress = () => {
    if (!onLongPress) {
      return;
    }
    rootRef.current?.measureInWindow((x, y, width, height) => {
      onLongPress({ x, y, width, height });
    });
  };

  const cardBody = (
    <View style={[styles.body, { padding: spacing.lg }]}>
      <View style={{ minHeight: titleBlockHeight }}>
        <Text
          variant="bodySmall"
          color="primary"
          numberOfLines={TITLE_LINES}
          style={styles.title}
        >
          {title}
        </Text>
      </View>
      <View style={{ minHeight: metaBlockHeight, justifyContent: 'flex-end' }}>
        <View style={{ gap: spacing.xs }}>
          {metaLines.slice(0, META_LINES).map((line) =>
            line ? (
              <Text key={line} variant="caption" color="secondary" numberOfLines={1}>
                {line}
              </Text>
            ) : null,
          )}
        </View>
      </View>
    </View>
  );

  const cardStyle = [
    styles.card,
    shadows.soft,
    {
      backgroundColor: colors.surface,
      borderRadius: radius.xl,
    },
  ];

  return (
    <View
      ref={rootRef}
      collapsable={false}
      style={[styles.root, { height: WORKSPACE_GRID_CARD_HEIGHT }]}
    >
      <CornerAccent color={colors.primary} cardRadius={radius.xl} />
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          onPress={onPress}
          onLongPress={onLongPress ? handleLongPress : undefined}
          delayLongPress={400}
          style={({ pressed }) => [...cardStyle, { opacity: pressed ? 0.96 : 1 }]}
        >
          {cardBody}
        </Pressable>
      ) : (
        <View style={cardStyle} pointerEvents="none">
          {cardBody}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    overflow: 'visible',
  },
  card: {
    flex: 1,
    width: '100%',
  },
  cornerAccent: {
    position: 'absolute',
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    zIndex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '500',
  },
});

/** @deprecated Use WORKSPACE_GRID_CARD_HEIGHT */
export const WORKSPACE_GRID_CARD_MIN_HEIGHT = WORKSPACE_GRID_CARD_HEIGHT;
