import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';

import { TypographyVariant, useTheme } from '@/theme';
import { fontFamilyForWeight } from '@/theme/typography';

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

  const base = typography[variant];
  const flat = StyleSheet.flatten([base, style]);
  const family = fontFamilyForWeight(flat?.fontWeight);

  return (
    <RNText
      style={[base, { color: colorMap[color] }, style, { fontFamily: family }]}
      {...props}
    />
  );
}
