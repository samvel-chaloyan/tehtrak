import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from '@/theme';

export interface SkeletonCardProps {
  lines?: number;
}

export function SkeletonCard({ lines = 2 }: SkeletonCardProps) {
  const { colors, spacing } = useTheme();
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.md,
          opacity,
          gap: spacing.sm,
        },
      ]}
    >
      <View
        style={[
          styles.line,
          styles.titleLine,
          { backgroundColor: colors.border, borderRadius: spacing.xs },
        ]}
      />
      {Array.from({ length: lines }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.line,
            {
              backgroundColor: colors.border,
              borderRadius: spacing.xs,
              width: index === lines - 1 ? '55%' : '80%',
            },
          ]}
        />
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  line: {
    height: 14,
    width: '80%',
  },
  titleLine: {
    height: 18,
    width: '40%',
  },
});
