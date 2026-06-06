import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from '@/theme';

export interface SkeletonCardProps {
  lines?: number;
}

export function SkeletonCard({ lines = 2 }: SkeletonCardProps) {
  const { colors, radius, spacing } = useTheme();
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 800,
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
          backgroundColor: colors.background,
          borderColor: colors.border,
          borderRadius: radius.lg,
          padding: spacing.md,
          opacity,
        },
      ]}
    >
      <View
        style={[
          styles.line,
          styles.titleLine,
          { backgroundColor: colors.surface, borderRadius: radius.sm },
        ]}
      />
      {Array.from({ length: lines }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.line,
            { backgroundColor: colors.surface, borderRadius: radius.sm, width: index === lines - 1 ? '60%' : '85%' },
          ]}
        />
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    gap: 8,
  },
  line: {
    height: 14,
    width: '85%',
  },
  titleLine: {
    height: 18,
    width: '45%',
    marginBottom: 4,
  },
});
