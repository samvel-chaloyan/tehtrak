import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/theme';
import { PageTitle } from './PageTitle';
import { Stack } from './Stack';
import { Text } from './Text';

export interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  style?: object;
}

export function ScreenHeader({ title, subtitle, action, style }: ScreenHeaderProps) {
  const { spacing } = useTheme();

  return (
    <View style={[styles.container, { marginBottom: spacing.lg }, style]}>
      <View style={styles.row}>
        <Stack gap="xs" style={[styles.content, { paddingRight: spacing.md }]}>
          <PageTitle style={styles.title}>{title}</PageTitle>
          {subtitle ? (
            <Text variant="body" color="secondary">
              {subtitle}
            </Text>
          ) : null}
        </Stack>
        {action ? <View style={[styles.action, { paddingTop: spacing.xs }]}>{action}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
