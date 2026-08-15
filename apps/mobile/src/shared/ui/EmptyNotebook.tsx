import { StyleSheet } from 'react-native';

import { useTheme } from '@/theme';
import { BrandWatermarkBackground } from './BrandWatermark';
import { Stack } from './Stack';
import { Text } from './Text';
import { TextLink } from './TextLink';

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
    <BrandWatermarkBackground
      style={[styles.container, { paddingVertical: spacing['2xl'] }]}
    >
      <Stack gap="lg" align="center">
        <Stack gap="sm" align="center">
          <Text variant="sectionTitle" color="secondary" style={styles.centered}>
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
    </BrandWatermarkBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    textAlign: 'center',
    maxWidth: 300,
  },
});
