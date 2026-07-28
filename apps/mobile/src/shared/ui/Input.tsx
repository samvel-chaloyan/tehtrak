import { forwardRef, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';
import { Stack } from './Stack';

type InputLabelColor = 'primary' | 'secondary' | 'tertiary' | 'accent';
type InputValueColor = 'primary' | 'secondary';

export interface InputProps extends TextInputProps {
  label?: string;
  labelColor?: InputLabelColor;
  valueColor?: InputValueColor;
  hint?: string;
  error?: string;
  variant?: 'default' | 'plain';
}

export const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    label,
    labelColor = 'secondary',
    valueColor = 'primary',
    hint,
    error,
    variant = 'default',
    style,
    onFocus,
    onBlur,
    ...props
  },
  ref,
) {
  const { colors, radius, spacing, typography } = useTheme();
  const [focused, setFocused] = useState(false);
  const isPlain = variant === 'plain';
  const inputColor =
    valueColor === 'secondary' ? colors.textSecondary : colors.textPrimary;

  const borderColor = error
    ? colors.danger
    : focused
      ? colors.primary
      : colors.border;

  return (
    <Stack gap="xs" style={styles.wrapper}>
      {label && !isPlain ? (
        <Text variant="label" color={labelColor}>
          {label}
        </Text>
      ) : null}
      <TextInput
        ref={ref}
        placeholderTextColor={colors.textTertiary}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        style={[
          styles.input,
          typography.body,
          isPlain
            ? {
                backgroundColor: 'transparent',
                borderWidth: 0,
                color: inputColor,
                paddingHorizontal: 0,
                paddingVertical: 0,
                minHeight: undefined,
              }
            : {
                backgroundColor: colors.surface,
                borderColor,
                borderRadius: radius.md,
                color: inputColor,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.md,
              },
          style,
        ]}
        {...props}
      />
      {error ? (
        <Text variant="caption" color="danger">
          {error}
        </Text>
      ) : hint ? (
        <Text variant="caption" color="tertiary">
          {hint}
        </Text>
      ) : null}
    </Stack>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    minHeight: 52,
  },
});
