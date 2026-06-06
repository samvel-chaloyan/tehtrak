import { View } from 'react-native';
import { useTheme } from '@/theme';
import { SkeletonCard } from './SkeletonCard';

export interface SkeletonListProps {
  count?: number;
}

export function SkeletonList({ count = 4 }: SkeletonListProps) {
  const { spacing } = useTheme();

  return (
    <View style={{ gap: spacing.list, paddingBottom: spacing['2xl'] }}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} lines={index % 2 === 0 ? 2 : 1} />
      ))}
    </View>
  );
}
