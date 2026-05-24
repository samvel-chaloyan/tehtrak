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
      <Text variant="label" color="secondary">
        {title}
      </Text>
      {subtitle ? (
        <Text variant="caption" color="tertiary" style={{ marginTop: 2 }}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
