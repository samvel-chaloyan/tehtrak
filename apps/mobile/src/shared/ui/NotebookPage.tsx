import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useTheme } from '@/theme';

import { PageTitle } from './PageTitle';
import { Text } from './Text';

export interface NotebookPageProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** Item page surface — quiet, unframed; matches list shelves (`framed={false}`). */
export function NotebookPage({ children, style }: NotebookPageProps) {
  return <View style={[styles.page, style]}>{children}</View>;
}

export interface NotebookPageHeaderProps {
  title?: string;
  caption?: string;
}

/** Compact page meta — caption-only is a single quiet line, not a banner block. */
export function NotebookPageHeader({ title, caption }: NotebookPageHeaderProps) {
  const { colors, spacing } = useTheme();
  const captionOnly = Boolean(caption) && !title;

  return (
    <View
      style={[
        styles.header,
        {
          paddingHorizontal: spacing.lg,
          paddingTop: captionOnly ? spacing.xs : spacing.md,
          paddingBottom: captionOnly ? spacing.sm : spacing.md,
          gap: spacing.xs,
        },
      ]}
    >
      {title ? <PageTitle style={styles.title}>{title}</PageTitle> : null}
      {caption ? (
        <Text variant="caption" color="tertiary">
          {caption}
        </Text>
      ) : null}
      {title ? (
        <View
          style={[
            styles.headerRule,
            { backgroundColor: colors.border, marginTop: spacing.list },
          ]}
        />
      ) : null}
    </View>
  );
}

export interface NotebookPageRowProps {
  label: string;
  children: ReactNode;
  showDivider?: boolean;
  /** When true, value renders inside a quiet bordered field (no row wash). */
  editing?: boolean;
}

/** One property row inside a notebook page — label above value, inset divider like list rows. */
export function NotebookPageRow({
  label,
  children,
  showDivider = false,
  editing = false,
}: NotebookPageRowProps) {
  const { colors, radius, spacing } = useTheme();

  return (
    <View>
      <View
        style={[
          styles.row,
          {
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.md,
            gap: spacing.xs,
          },
        ]}
      >
        <Text variant="caption" color="tertiary">
          {label}
        </Text>
        {editing ? (
          <View
            style={[
              styles.editField,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: radius.md,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.md,
              },
            ]}
          >
            {children}
          </View>
        ) : (
          <View style={styles.rowContent}>{children}</View>
        )}
      </View>
      {showDivider ? (
        <View
          style={[
            styles.divider,
            {
              backgroundColor: colors.border,
              marginLeft: spacing.lg,
            },
          ]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 0,
  },
  header: {
    width: '100%',
  },
  title: {
    marginBottom: 0,
  },
  headerRule: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
  row: {
    width: '100%',
  },
  rowContent: {
    width: '100%',
  },
  editField: {
    borderWidth: 1,
    minHeight: 48,
    width: '100%',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
});
