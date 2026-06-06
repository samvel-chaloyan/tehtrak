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
  size = 'md',
  fullWidth = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const { colors, radius, spacing } = useTheme();

  const variantStyles: Record<
    ButtonVariant,
    { bg: string; text: 'inverse' | 'accent' | 'danger'; border?: string }
  > = {
    primary: { bg: colors.primary, text: 'inverse' },
    secondary: { bg: colors.background, text: 'accent', border: colors.primary },
    ghost: { bg: 'transparent', text: 'accent' },
    danger: { bg: colors.background, text: 'danger', border: colors.danger },
  };

  const v = variantStyles[variant];
  const height = size === 'lg' ? 52 : 48;
  const paddingHorizontal = size === 'lg' ? spacing.lg : spacing.md;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: v.bg,
          borderColor: v.border ?? 'transparent',
          borderWidth: v.border ? 1 : 0,
          borderRadius: radius.md,
          minHeight: height,
          paddingHorizontal,
          opacity: disabled ? 0.5 : pressed ? 0.88 : 1,
          width: fullWidth ? '100%' : undefined,
        },
        style as ViewStyle,
      ]}
      {...props}
    >
      <Text variant="subtitle" color={v.text} style={styles.label}>
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
