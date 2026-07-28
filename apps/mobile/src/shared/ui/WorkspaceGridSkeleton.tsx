import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme';

import { SkeletonCard } from './SkeletonCard';
import { WORKSPACE_GRID_CARD_HEIGHT } from './WorkspaceGridCard';

export interface WorkspaceGridSkeletonProps {
  count?: number;
}

export function WorkspaceGridSkeleton({ count = 4 }: WorkspaceGridSkeletonProps) {
  const { colors, radius, shadows, spacing } = useTheme();

  return (
    <View
      style={[
        styles.grid,
        {
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.lg,
          paddingBottom: spacing.lg,
          gap: spacing.md,
        },
      ]}
    >
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.cell,
            shadows.soft,
            {
              borderRadius: radius.xl,
              height: WORKSPACE_GRID_CARD_HEIGHT,
              backgroundColor: colors.surface,
            },
          ]}
        >
          <View style={[styles.clip, { borderRadius: radius.xl }]}>
            <SkeletonCard lines={2} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    flexGrow: 1,
    flexBasis: '47%',
    maxWidth: '47%',
  },
  clip: {
    flex: 1,
    overflow: 'hidden',
  },
});
