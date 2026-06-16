import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

export interface NotebookFieldProps {
  label: string;
  value: string;
}

/** Readable field on a notebook page — spacing, not boxes. */
export function NotebookField({ label, value }: NotebookFieldProps) {
  const { spacing } = useTheme();

  return (
    <View style={[styles.field, { gap: spacing.xs }]}>
      <Text variant="caption" color="tertiary">
        {label}
      </Text>
      <Text variant="body">{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    width: '100%',
  },
});
