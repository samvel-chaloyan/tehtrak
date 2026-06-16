import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { TypographyVariant, useTheme } from '@/theme';

type TextColor = 'primary' | 'secondary' | 'tertiary' | 'accent' | 'danger' | 'inverse';

export interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  color?: TextColor;
}

export function Text({
  variant = 'body',
  color = 'primary',
  style,
  ...props
}: TextProps) {
  const { colors, typography } = useTheme();

  const colorMap: Record<TextColor, string> = {
    primary: colors.textPrimary,
    secondary: colors.textSecondary,
    tertiary: colors.textTertiary,
    accent: colors.primary,
    danger: colors.danger,
    inverse: colors.textInverse,
  };

  return (
    <RNText
      style={[typography[variant], { color: colorMap[color] }, style]}
      {...props}
    />
  );
}
