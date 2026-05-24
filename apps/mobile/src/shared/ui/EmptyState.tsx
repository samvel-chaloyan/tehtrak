import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/theme';
import { Button } from './Button';
import { Stack } from './Stack';
import { Text } from './Text';

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const { spacing } = useTheme();

  return (
    <View style={[styles.container, { paddingVertical: spacing['2xl'] }]}>
      <Stack gap="sm" align="center">
        <Text variant="title" style={styles.centered}>
          {title}
        </Text>
        <Text variant="body" color="secondary" style={styles.centered}>
          {description}
        </Text>
        {actionLabel && onAction ? (
          <Button label={actionLabel} variant="secondary" onPress={onAction} style={{ marginTop: spacing.md }} />
        ) : null}
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  centered: {
    textAlign: 'center',
  },
});
