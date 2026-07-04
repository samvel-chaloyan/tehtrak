import { StyleSheet, View } from 'react-native';

import { Stack } from './Stack';
import { Text } from './Text';
import { useTheme } from '@/theme';

export interface EmptyListContentProps {
  title: string;
  description: string;
}

/** Quiet empty state for inside list frames — no brand symbol. */
export function EmptyListContent({ title, description }: EmptyListContentProps) {
  const { spacing } = useTheme();

  return (
    <View style={[styles.container, { paddingVertical: spacing['2xl'], paddingHorizontal: spacing.lg }]}>
      <Stack gap="sm" align="center">
        <Text variant="subtitle" color="secondary" style={styles.centered}>
          {title}
        </Text>
        <Text variant="bodySmall" color="secondary" style={styles.centered}>
          {description}
        </Text>
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
    maxWidth: 280,
  },
});
