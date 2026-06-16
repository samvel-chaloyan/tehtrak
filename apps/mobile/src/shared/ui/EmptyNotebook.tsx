import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/theme';
import { Stack } from './Stack';
import { Text } from './Text';
import { TextLink } from './TextLink';
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
      <Stack gap="lg" align="center">
        <ThreeLines size="md" align="center" />
        <Stack gap="sm" align="center">
          <Text variant="sectionTitle" style={styles.centered}>
            {title}
          </Text>
          <Text variant="body" color="secondary" style={styles.centered}>
            {description}
          </Text>
        </Stack>
        {actionLabel && onAction ? (
          <TextLink label={actionLabel} onPress={onAction} />
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
    maxWidth: 300,
  },
});
