import { Ionicons } from '@expo/vector-icons';
import { Pressable, PressableProps, StyleSheet, View, ViewStyle } from 'react-native';
import type { ComponentProps } from 'react';

import { Text } from './Text';
import { useTheme } from '@/theme';

export interface OutlineButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  icon?: ComponentProps<typeof Ionicons>['name'];
  disabled?: boolean;
  compact?: boolean;
}

export function OutlineButton({
  label,
  icon,
  disabled = false,
  compact = false,
  style,
  ...props
}: OutlineButtonProps) {
  const { colors, radius, spacing } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        compact ? styles.buttonCompact : styles.buttonFull,
        {
          backgroundColor: pressed ? colors.primary : colors.surface,
          borderColor: colors.primary,
          borderRadius: radius.button,
          opacity: disabled ? 0.5 : 1,
          paddingHorizontal: compact ? spacing.md : spacing.lg,
        },
        style as ViewStyle,
      ]}
      {...props}
    >
      {({ pressed }) => {
        const iconColor = pressed ? colors.textInverse : colors.primary;

        return (
          <View style={[styles.content, { gap: spacing.sm }]}>
            {icon ? <Ionicons name={icon} size={compact ? 16 : 20} color={iconColor} /> : null}
            <Text
              variant={compact ? 'caption' : 'body'}
              color={pressed ? 'inverse' : 'accent'}
              style={styles.label}
            >
              {label}
            </Text>
          </View>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFull: {
    minHeight: 52,
    width: '100%',
  },
  buttonCompact: {
    minHeight: 28,
    alignSelf: 'flex-start',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
  },
});
