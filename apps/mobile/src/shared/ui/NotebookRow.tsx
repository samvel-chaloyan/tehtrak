import { Pressable, StyleSheet, View } from 'react-native';
import { useRef } from 'react';

import { PinButton } from './PinButton';
import { RowActions } from './RowActions';
import { Text } from './Text';
import type { CardAnchorLayout } from './WorkspaceGridCard';
import { useTheme } from '@/theme';
import type { TypographyVariant } from '@/theme';
import type { PinTarget } from '@/types';

export type NotebookRowSize = 'workspace' | 'collection' | 'item';

const SIZE_CONFIG: Record<
  NotebookRowSize,
  {
    title: TypographyVariant;
    description: TypographyVariant;
    paddingVertical: 'lg' | 'md' | 'xl' | '2xl';
    titleWeight: '600' | '500';
    titleGap: 'xs' | 'sm' | 'md';
    metaGap: 'sm' | 'md';
    inset: boolean;
  }
> = {
  workspace: {
    title: 'subtitle',
    description: 'bodySmall',
    paddingVertical: 'xl',
    titleWeight: '600',
    titleGap: 'xs',
    metaGap: 'sm',
    inset: true,
  },
  collection: {
    title: 'subtitle',
    description: 'bodySmall',
    paddingVertical: 'md',
    titleWeight: '500',
    titleGap: 'xs',
    metaGap: 'sm',
    inset: true,
  },
  item: {
    title: 'subtitle',
    description: 'bodySmall',
    paddingVertical: 'md',
    titleWeight: '500',
    titleGap: 'xs',
    metaGap: 'sm',
    inset: true,
  },
};

export interface NotebookRowProps {
  title: string;
  description?: string;
  meta?: string;
  onPress?: () => void;
  /** Long-press receives window layout for the row info focus circle. */
  onLongPress?: (layout: CardAnchorLayout) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showDivider?: boolean;
  size?: NotebookRowSize;
  /** When set, shows a quiet pin toggle that does not open the row. */
  pinTarget?: PinTarget;
}

export function NotebookRow({
  title,
  description,
  meta,
  onPress,
  onLongPress,
  onEdit,
  onDelete,
  showDivider = false,
  size = 'workspace',
  pinTarget,
}: NotebookRowProps) {
  const { colors, spacing } = useTheme();
  const config = SIZE_CONFIG[size];
  const paddingVertical = spacing[config.paddingVertical];
  const horizontalPadding = config.inset ? spacing.lg : 0;
  const hasActions = Boolean(onEdit || onDelete);
  const hasTrailing = hasActions || Boolean(pinTarget);
  const rootRef = useRef<View>(null);

  const handleLongPress = () => {
    if (!onLongPress) {
      return;
    }
    rootRef.current?.measureInWindow((x, y, width, height) => {
      onLongPress({ x, y, width, height });
    });
  };

  const rowContent = (
    <View
      style={[
        styles.row,
        {
          paddingVertical,
          paddingLeft: horizontalPadding,
          paddingRight: hasTrailing ? spacing.sm : horizontalPadding,
        },
      ]}
    >
      <View style={styles.textBlock}>
        <Text
          variant={config.title}
          color="primary"
          style={{ fontWeight: config.titleWeight }}
        >
          {title}
        </Text>
        {description ? (
          <Text
            variant={config.description}
            color="secondary"
            numberOfLines={size === 'workspace' ? 3 : 2}
            style={{ marginTop: spacing[config.titleGap] }}
          >
            {description}
          </Text>
        ) : null}
        {meta ? (
          <Text
            variant="caption"
            color="tertiary"
            style={{ marginTop: spacing[config.metaGap] }}
          >
            {meta}
          </Text>
        ) : null}
      </View>
      {pinTarget ? <PinButton target={pinTarget} compact /> : null}
      {hasActions ? <RowActions onEdit={onEdit} onDelete={onDelete} /> : null}
    </View>
  );

  const row = (
    <View ref={rootRef}>
      {onPress || onLongPress ? (
        <Pressable
          accessibilityRole="button"
          onPress={onPress}
          onLongPress={onLongPress ? handleLongPress : undefined}
          delayLongPress={350}
          style={({ pressed }) => [
            pressed && onPress ? { backgroundColor: colors.background } : null,
          ]}
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
              backgroundColor: colors.border,
              marginLeft: horizontalPadding,
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
    height: StyleSheet.hairlineWidth,
  },
});
