import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  const { spacing } = useTheme();

  return (
    <View style={[styles.container, { marginBottom: spacing.sm }]}>
      <Text variant="sectionTitle">{title}</Text>
      {subtitle ? (
        <Text variant="caption" color="secondary" style={{ marginTop: spacing.xs }}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
