import { Pressable, PressableProps, StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from '@/theme';

export interface CardProps extends ViewProps {
  onPress?: PressableProps['onPress'];
  padded?: boolean;
  elevated?: boolean;
}

export function Card({
  children,
  onPress,
  padded = true,
  elevated = false,
  style,
  ...props
}: CardProps) {
  const { colors, radius, spacing, shadows } = useTheme();

  const cardStyle = [
    styles.card,
    {
      backgroundColor: colors.surfaceElevated,
      borderRadius: radius.lg,
      borderColor: colors.borderLight,
      borderWidth: 1,
      padding: padded ? spacing.md : 0,
    },
    elevated ? shadows.card : null,
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [cardStyle, { opacity: pressed ? 0.96 : 1 }]}
        {...props}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
});
