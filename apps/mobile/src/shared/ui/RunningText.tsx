import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { typography } from '@/theme/typography';

/** Space between duplicated copies for a seamless loop. */
const MARQUEE_GAP = 40;
/** Scroll speed — higher = slower. */
const MS_PER_PX = 42;
/** Centered hold before long text starts sliding. */
const START_DELAY_MS = 1000;

export interface RunningTextProps {
  text: string;
  color: string;
  align?: 'left' | 'center' | 'right';
  /** Optional typography override (defaults to bodySmall). */
  textStyle?: TextStyle;
  /** When set, overflow is judged against this width (e.g. fixed tab inner width). */
  availableWidth?: number;
  /** Fires once both track and text widths are known (for invisible swaps). */
  onReady?: () => void;
}

/** Ignore sub-pixel noise when deciding to marquee. */
const OVERFLOW_SLACK = 4;

/**
 * Short text → stays still in place.
 * Long text → holds ~1s, then seamless looping marquee.
 */
export function RunningText({
  text,
  color,
  align = 'center',
  textStyle,
  availableWidth,
  onReady,
}: RunningTextProps) {
  const translateX = useSharedValue(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const [sliding, setSliding] = useState(false);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  const effectiveTrack = availableWidth ?? trackWidth;
  const measured =
    availableWidth != null ? textWidth > 0 : trackWidth > 0 && textWidth > 0;
  const overflows = measured && textWidth > effectiveTrack + OVERFLOW_SLACK;

  useEffect(() => {
    if (measured) {
      onReadyRef.current?.();
    }
  }, [measured]);

  // New copy → remeasure and return to centered hold.
  useEffect(() => {
    cancelAnimation(translateX);
    translateX.value = 0;
    setTextWidth(0);
    setSliding(false);
  }, [text, translateX]);

  // Arm the slide once we know the line overflows — do not re-arm on tiny layout noise.
  useEffect(() => {
    if (!overflows) {
      setSliding(false);
      return;
    }

    const timer = setTimeout(() => {
      setSliding(true);
    }, START_DELAY_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [overflows, text]);

  // Drive the loop only while sliding.
  useEffect(() => {
    cancelAnimation(translateX);
    translateX.value = 0;

    if (!sliding || !overflows || textWidth <= 0) {
      return;
    }

    const distance = textWidth + MARQUEE_GAP;
    const duration = Math.max(3000, distance * MS_PER_PX);

    translateX.value = withRepeat(
      withTiming(-distance, { duration, easing: Easing.linear }),
      -1,
      false,
    );

    return () => {
      cancelAnimation(translateX);
    };
  }, [sliding, overflows, textWidth, translateX]);

  const marqueeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const showMarquee = overflows && sliding;
  const typeStyle = [typography.bodySmall, textStyle];

  return (
    <View
      style={[
        styles.track,
        textStyle?.lineHeight != null && { minHeight: textStyle.lineHeight },
      ]}
      onLayout={(event) => {
        const width = Math.floor(event.nativeEvent.layout.width);
        if (width > 0 && width !== trackWidth) {
          setTrackWidth(width);
        }
      }}
    >
      <View style={styles.viewport}>
        {showMarquee ? (
          <Animated.View style={[styles.row, marqueeStyle]}>
            <Text
              numberOfLines={1}
              ellipsizeMode="clip"
              style={[...typeStyle, styles.seg, { color }]}
            >
              {text}
            </Text>
            <View style={{ width: MARQUEE_GAP }} />
            <Text
              numberOfLines={1}
              ellipsizeMode="clip"
              style={[...typeStyle, styles.seg, { color }]}
            >
              {text}
            </Text>
          </Animated.View>
        ) : (
          <Text
            numberOfLines={1}
            ellipsizeMode="clip"
            style={[
              ...typeStyle,
              align === 'center' && styles.centered,
              align === 'right' && styles.right,
              align === 'left' && styles.left,
              { color },
            ]}
          >
            {text}
          </Text>
        )}
      </View>

      <View style={styles.probeHost} pointerEvents="none">
        <Text
          numberOfLines={1}
          ellipsizeMode="clip"
          onTextLayout={(event) => {
            const line = event.nativeEvent.lines[0];
            const width = line ? Math.ceil(line.width) : 0;
            if (width > 0 && width !== textWidth) {
              setTextWidth(width);
            }
          }}
          style={[...typeStyle, styles.probeText, { color }]}
        >
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    minHeight: typography.bodySmall.lineHeight,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  viewport: {
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  seg: {
    flexShrink: 0,
    flexGrow: 0,
  },
  centered: {
    width: '100%',
    textAlign: 'center',
  },
  right: {
    width: '100%',
    textAlign: 'right',
  },
  left: {
    width: '100%',
    textAlign: 'left',
  },
  probeHost: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 10000,
    opacity: 0,
  },
  probeText: {
    alignSelf: 'flex-start',
    flexShrink: 0,
    flexGrow: 0,
  },
});
