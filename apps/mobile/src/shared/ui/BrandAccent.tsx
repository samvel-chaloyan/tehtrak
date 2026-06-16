import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

export interface BrandAccentProps {
  width?: number;
  style?: StyleProp<ViewStyle>;
}

/** Short primary accent bar — Tehtrak identity mark in layout. */
export function BrandAccent({ width = 40, style }: BrandAccentProps) {
  const { colors, radius, spacing } = useTheme();

  return (
    <View
      style={[
        {
          width,
          height: 3,
          backgroundColor: colors.primary,
          borderRadius: radius.sm,
          marginTop: spacing.md,
        },
        style,
      ]}
    />
  );
}

export interface SectionLabelProps {
  label: string;
  style?: StyleProp<ViewStyle>;
}

/** Quiet branded metadata pill. */
export function SectionLabel({ label, style }: SectionLabelProps) {
  const { colors, radius, spacing } = useTheme();

  return (
    <View
      style={[
        styles.pill,
        {
          backgroundColor: colors.primaryMuted,
          borderRadius: radius.sm,
          paddingHorizontal: spacing.sm,
          paddingVertical: spacing.xs,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.primaryBorder,
        },
        style,
      ]}
    >
      <Text variant="caption" color="accent">
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
  },
});
