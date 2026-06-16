import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';
import type { TypographyVariant } from '@/theme';

export type NotebookRowSize = 'workspace' | 'collection' | 'item';

const SIZE_CONFIG: Record<
  NotebookRowSize,
  { title: TypographyVariant; description: TypographyVariant; paddingVertical: 'lg' | 'md' }
> = {
  workspace: { title: 'title', description: 'body', paddingVertical: 'lg' },
  collection: { title: 'subtitle', description: 'bodySmall', paddingVertical: 'md' },
  item: { title: 'subtitle', description: 'bodySmall', paddingVertical: 'md' },
};

export interface NotebookRowProps {
  title: string;
  description?: string;
  meta?: string;
  onPress?: () => void;
  showDivider?: boolean;
  size?: NotebookRowSize;
}

export function NotebookRow({
  title,
  description,
  meta,
  onPress,
  showDivider = false,
  size = 'workspace',
}: NotebookRowProps) {
  const { colors, spacing } = useTheme();
  const config = SIZE_CONFIG[size];
  const paddingVertical = spacing[config.paddingVertical];

  const row = (
    <View>
      <View
        style={[
          styles.row,
          {
            paddingVertical,
            paddingHorizontal: spacing.lg,
          },
        ]}
      >
        <Text variant={config.title}>{title}</Text>
        {description ? (
          <Text
            variant={config.description}
            color="secondary"
            numberOfLines={size === 'workspace' ? 3 : 2}
            style={{ marginTop: spacing.xs }}
          >
            {description}
          </Text>
        ) : null}
        {meta ? (
          <Text variant="caption" color="tertiary" style={{ marginTop: spacing.sm }}>
            {meta}
          </Text>
        ) : null}
      </View>
      {showDivider ? (
        <View
          style={[
            styles.divider,
            {
              backgroundColor: colors.border,
              marginLeft: spacing.lg,
            },
          ]}
        />
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.75 : 1 }]}
      >
        {row}
      </Pressable>
    );
  }

  return row;
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
});
