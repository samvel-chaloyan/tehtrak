import { StyleSheet, View } from 'react-native';

/** Corner accent stroke — quiet Tehtrak identity on place cards and list bodies. */
export const CORNER_ACCENT_STROKE = 3;
/** Straight run past the curve along top + left. */
const ACCENT_EXTEND = 14;

export interface CornerAccentProps {
  color: string;
  /** Inner surface corner radius the stroke hugs. */
  surfaceRadius: number;
}

/**
 * Outside top-left accent as one continuous L-stroke (rounded corner).
 * Parent must reserve `CORNER_ACCENT_STROKE` inset (or allow overflow)
 * so the stroke is not clipped.
 */
export function CornerAccent({ color, surfaceRadius }: CornerAccentProps) {
  const outerR = surfaceRadius + CORNER_ACCENT_STROKE;
  const arm = outerR + ACCENT_EXTEND;

  return (
    <View
      pointerEvents="none"
      style={[
        styles.cornerAccent,
        {
          top: -CORNER_ACCENT_STROKE,
          left: -CORNER_ACCENT_STROKE,
          width: arm,
          height: arm,
          borderTopWidth: CORNER_ACCENT_STROKE,
          borderLeftWidth: CORNER_ACCENT_STROKE,
          borderTopColor: color,
          borderLeftColor: color,
          borderTopLeftRadius: outerR,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  cornerAccent: {
    position: 'absolute',
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    zIndex: 1,
  },
});
