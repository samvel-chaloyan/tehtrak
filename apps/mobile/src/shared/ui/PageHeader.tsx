import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/theme';
import { PageTitle } from './PageTitle';
import { Stack } from './Stack';
import { Text } from './Text';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  style?: object;
}

/**
 * In-screen page header — typography only.
 * Use when native navigation title is hidden. Never duplicate native title.
 */
export function PageHeader({ title, subtitle, action, style }: PageHeaderProps) {
  const { spacing } = useTheme();

  return (
    <View style={[{ marginBottom: spacing.lg }, style]}>
      <View style={styles.row}>
        <Stack gap="xs" style={[styles.content, { paddingRight: spacing.md }]}>
          <PageTitle style={styles.title}>{title}</PageTitle>
          {subtitle ? (
            <Text variant="bodySmall" color="secondary">
              {subtitle}
            </Text>
          ) : null}
        </Stack>
        {action ? <View style={[styles.action, { paddingTop: spacing.xs }]}>{action}</View> : null}
      </View>
    </View>
  );
}

/** @deprecated Use PageHeader */
export const ScreenHeader = PageHeader;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  title: {
    marginBottom: 0,
  },
  action: {
    flexShrink: 0,
  },
});
