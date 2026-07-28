import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export function Button({
  label,
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const { colors, radius, shadows, spacing } = useTheme();

  const variantStyles: Record<
    ButtonVariant,
    {
      bg: string;
      pressedBg?: string;
      text: 'inverse' | 'primary' | 'secondary' | 'danger';
      border?: string;
    }
  > = {
    primary: { bg: colors.primary, pressedBg: colors.primaryPressed, text: 'inverse' },
    secondary: { bg: colors.surface, text: 'primary', border: colors.borderSecondary },
    ghost: { bg: 'transparent', text: 'secondary' },
    danger: { bg: colors.surface, text: 'danger', border: colors.danger },
  };

  const v = variantStyles[variant];
  const height = size === 'lg' ? 52 : 48;
  const paddingHorizontal = size === 'lg' ? spacing.lg : spacing.md;
  const borderRadius = size === 'lg' ? radius.button : radius.md;
  const elevated = variant === 'primary' || variant === 'secondary' || variant === 'danger';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        elevated && shadows.soft,
        {
          backgroundColor:
            pressed && v.pressedBg ? v.pressedBg : v.bg,
          borderColor: v.border ?? 'transparent',
          borderWidth: v.border ? 1 : 0,
          borderRadius,
          minHeight: height,
          paddingHorizontal,
          opacity: disabled ? 0.5 : pressed && !v.pressedBg ? 0.88 : 1,
          width: fullWidth ? '100%' : undefined,
        },
        style as ViewStyle,
      ]}
      {...props}
    >
      <Text variant="body" color={v.text} style={styles.label}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
  },
});
