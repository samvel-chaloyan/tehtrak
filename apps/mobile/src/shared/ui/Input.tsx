import { forwardRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/theme';
import { Text } from './Text';
import { Stack } from './Stack';

type InputLabelColor = 'primary' | 'secondary' | 'tertiary' | 'accent';
type InputValueColor = 'primary' | 'secondary';

export interface InputProps extends TextInputProps {
  label?: string;
  labelColor?: InputLabelColor;
  valueColor?: InputValueColor;
  /** Quiet caption under the field (hidden when `error` is set). */
  hint?: string;
  error?: string;
  variant?: 'default' | 'plain';
  /** Shows an eye control to reveal/hide `secureTextEntry` values. */
  revealable?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    label,
    labelColor = 'secondary',
    valueColor = 'primary',
    hint,
    error,
    variant = 'default',
    revealable = false,
    secureTextEntry,
    style,
    onFocus,
    onBlur,
    ...props
  },
  ref,
) {
  const { colors, radius, spacing, typography } = useTheme();
  const [focused, setFocused] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const isPlain = variant === 'plain';
  const inputColor =
    valueColor === 'secondary' ? colors.textSecondary : colors.textPrimary;
  const isSecure = Boolean(secureTextEntry) && !revealed;
  const showRevealToggle = revealable && Boolean(secureTextEntry);

  const borderColor = error
    ? colors.danger
    : focused
      ? colors.primary
      : colors.border;

  const fieldShellStyle = isPlain
    ? undefined
    : {
        backgroundColor: colors.surface,
        borderColor,
        borderRadius: radius.md,
        borderWidth: StyleSheet.hairlineWidth,
      };

  const textInput = (
    <TextInput
      ref={ref}
      placeholderTextColor={colors.textTertiary}
      secureTextEntry={isSecure}
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
              backgroundColor: 'transparent',
              borderWidth: 0,
              color: inputColor,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.md,
              flex: showRevealToggle ? 1 : undefined,
            },
        style,
      ]}
      {...props}
    />
  );

  return (
    <Stack gap="xs" style={styles.wrapper}>
      {label && !isPlain ? (
        <Text variant="label" color={labelColor}>
          {label}
        </Text>
      ) : null}

      {showRevealToggle && !isPlain ? (
        <View style={[styles.fieldRow, fieldShellStyle]}>
          {textInput}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={revealed ? 'Hide password' : 'Show password'}
            hitSlop={8}
            onPress={() => setRevealed((value) => !value)}
            style={({ pressed }) => [
              styles.revealHit,
              {
                opacity: pressed ? 0.7 : 1,
                paddingRight: spacing.sm,
              },
            ]}
          >
            <Ionicons
              name={revealed ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={colors.textSecondary}
            />
          </Pressable>
        </View>
      ) : isPlain ? (
        textInput
      ) : (
        <View style={fieldShellStyle}>{textInput}</View>
      )}

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
    minHeight: 52,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  revealHit: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
