import { Pressable, StyleSheet, View } from 'react-native';

import { RowActions } from './RowActions';
import { Text } from './Text';
import { useTheme } from '@/theme';
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
  onEdit?: () => void;
  onDelete?: () => void;
  showDivider?: boolean;
  size?: NotebookRowSize;
}

export function NotebookRow({
  title,
  description,
  meta,
  onPress,
  onEdit,
  onDelete,
  showDivider = false,
  size = 'workspace',
}: NotebookRowProps) {
  const { colors, spacing } = useTheme();
  const config = SIZE_CONFIG[size];
  const paddingVertical = spacing[config.paddingVertical];
  const titleColor = onPress && size === 'workspace' ? 'accent' : 'secondary';
  const hasActions = Boolean(onEdit || onDelete);

  const rowContent = (
    <View
      style={[
        styles.row,
        {
          paddingVertical,
          paddingLeft: spacing.lg,
          paddingRight: hasActions ? spacing.sm : spacing.lg,
        },
      ]}
    >
      <View style={styles.textBlock}>
        <Text variant={config.title} color={titleColor}>
          {title}
        </Text>
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
      {hasActions ? <RowActions onEdit={onEdit} onDelete={onDelete} /> : null}
    </View>
  );

  const row = (
    <View>
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          onPress={onPress}
          style={({ pressed }) => [pressed && { backgroundColor: colors.primaryMuted }]}
        >
          {rowContent}
        </Pressable>
      ) : (
        rowContent
      )}
      {showDivider ? (
        <View
          style={[
            styles.divider,
            {
              backgroundColor: colors.primaryBorder,
              marginLeft: spacing.lg,
            },
          ]}
        />
      ) : null}
    </View>
  );

  return row;
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBlock: {
    flex: 1,
  },
  divider: {
    height: 1,
  },
});
