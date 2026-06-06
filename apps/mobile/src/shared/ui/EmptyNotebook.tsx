import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/theme';
import { Button } from './Button';
import { Stack } from './Stack';
import { Text } from './Text';
import { ThreeLines } from './ThreeLines';

export interface EmptyNotebookProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyNotebook({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyNotebookProps) {
  const { spacing } = useTheme();

  return (
    <View style={[styles.container, { paddingVertical: spacing['2xl'] }]}>
      <Stack gap="md" align="center">
        <ThreeLines size="md" align="center" />
        <Text variant="sectionTitle" style={styles.centered}>
          {title}
        </Text>
        <Text variant="body" color="secondary" style={styles.centered}>
          {description}
        </Text>
        {actionLabel && onAction ? (
          <Button
            label={actionLabel}
            onPress={onAction}
            style={{ marginTop: spacing.sm }}
          />
        ) : null}
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    textAlign: 'center',
  },
});
