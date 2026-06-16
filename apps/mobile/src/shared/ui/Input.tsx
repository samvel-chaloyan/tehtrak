import { forwardRef, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';
import { Stack } from './Stack';

export interface InputProps extends TextInputProps {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { label, hint, error, style, onFocus, onBlur, ...props },
  ref,
) {
  const { colors, radius, spacing, typography } = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? colors.danger
    : focused
      ? colors.textTertiary
      : colors.border;

  return (
    <Stack gap="xs" style={styles.wrapper}>
      {label ? (
        <Text variant="label" color="secondary">
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
          {
            backgroundColor: colors.surface,
            borderColor,
            borderRadius: radius.md,
            color: colors.textPrimary,
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
