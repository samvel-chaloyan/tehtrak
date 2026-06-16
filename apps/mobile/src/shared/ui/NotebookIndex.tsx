import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '@/theme';

/** Shared grouped index surface styles — one surface, rows + dividers. */
export function useNotebookIndexStyle(): ViewStyle {
  const { colors, radius, spacing } = useTheme();

  return {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingVertical: spacing.xs,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  };
}

export interface NotebookIndexProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function NotebookIndex({ children, style }: NotebookIndexProps) {
  const indexStyle = useNotebookIndexStyle();

  return <View style={[indexStyle, style]}>{children}</View>;
}

export interface IndexFooterProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** Quiet action area below a grouped index. */
export function IndexFooter({ children, style }: IndexFooterProps) {
  const { spacing } = useTheme();

  return (
    <View style={[{ paddingTop: spacing.lg, paddingBottom: spacing.sm }, style]}>
      {children}
    </View>
  );
}
