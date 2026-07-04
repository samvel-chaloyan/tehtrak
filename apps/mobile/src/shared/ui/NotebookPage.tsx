import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useTheme } from '@/theme';

import { NotebookIndexFrame } from './NotebookIndex';
import { PageTitle } from './PageTitle';
import { Text } from './Text';

export interface NotebookPageProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** Bordered notebook page — one item's content inside a framed surface. */
export function NotebookPage({ children, style }: NotebookPageProps) {
  return <NotebookIndexFrame style={[styles.page, style]}>{children}</NotebookIndexFrame>;
}

export interface NotebookPageHeaderProps {
  title?: string;
  caption?: string;
}

export function NotebookPageHeader({ title, caption }: NotebookPageHeaderProps) {
  const { colors, spacing } = useTheme();

  return (
    <View
      style={[
        styles.header,
        {
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.lg,
          paddingBottom: spacing.md,
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
      <View
        style={[
          styles.headerRule,
          { backgroundColor: colors.primaryBorder, marginTop: spacing.list },
        ]}
      />
    </View>
  );
}

export interface NotebookPageRowProps {
  label: string;
  children: ReactNode;
  showDivider?: boolean;
  /** Highlights the value area as an editable control. */
  editing?: boolean;
}

/** One property row inside a notebook page — label, value or input, inset divider. */
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
          editing && { backgroundColor: colors.primaryMuted },
          {
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.md,
            gap: spacing.xs,
          },
        ]}
      >
        <Text variant="caption" color={editing ? 'accent' : 'tertiary'}>
          {label}
        </Text>
        {editing ? (
          <View
            style={[
              styles.editField,
              {
                backgroundColor: colors.surface,
                borderColor: colors.primaryBorder,
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
              backgroundColor: colors.primaryBorder,
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
