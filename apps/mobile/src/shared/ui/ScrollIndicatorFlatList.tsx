import { useCallback, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  LayoutChangeEvent,
  StyleSheet,
  View,
  type FlatListProps,
} from 'react-native';

import { useTheme } from '@/theme';

const INDICATOR_MIN_HEIGHT = 32;

export function ScrollIndicatorFlatList<T>({
  onScroll,
  onContentSizeChange,
  onLayout,
  style,
  ...props
}: FlatListProps<T>) {
  const { colors, spacing } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);
  const [layoutHeight, setLayoutHeight] = useState(0);

  const scrollRange = Math.max(contentHeight - layoutHeight, 1);
  const scrollable = contentHeight > layoutHeight;
  const thumbHeight = scrollable
    ? Math.max((layoutHeight / contentHeight) * layoutHeight, INDICATOR_MIN_HEIGHT)
    : 0;
  const maxThumbOffset = Math.max(layoutHeight - thumbHeight, 0);

  const thumbTranslateY = scrollY.interpolate({
    inputRange: [0, scrollRange],
    outputRange: [0, maxThumbOffset],
    extrapolate: 'clamp',
  });

  const handleContentSizeChange = useCallback(
    (width: number, height: number) => {
      setContentHeight(height);
      onContentSizeChange?.(width, height);
    },
    [onContentSizeChange],
  );

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      setLayoutHeight(event.nativeEvent.layout.height);
      onLayout?.(event);
    },
    [onLayout],
  );

  const handleScroll = useCallback(
    (event: Parameters<NonNullable<FlatListProps<T>['onScroll']>>[0]) => {
      scrollY.setValue(event.nativeEvent.contentOffset.y);
      onScroll?.(event);
    },
    [onScroll, scrollY],
  );

  return (
    <View style={[styles.container, style]}>
      <FlatList
        {...props}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        scrollEventThrottle={16}
        onScroll={handleScroll}
        onContentSizeChange={handleContentSizeChange}
        onLayout={handleLayout}
      />

      {scrollable ? (
        <View
          pointerEvents="none"
          style={[
            styles.track,
            {
              top: spacing.xs,
              bottom: spacing.xs,
              right: spacing.xs,
              width: spacing.xs,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.thumb,
              {
                height: thumbHeight,
                backgroundColor: colors.primaryBorder,
                borderRadius: spacing.xs / 2,
                transform: [{ translateY: thumbTranslateY }],
              },
            ]}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 0,
  },
  list: {
    flex: 1,
  },
  track: {
    position: 'absolute',
  },
  thumb: {
    width: '100%',
  },
});
