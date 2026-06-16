import { StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from '@/theme';
import { SectionLabel } from './BrandAccent';
import { ThreeLines } from './ThreeLines';

export interface ContextHeaderProps {
  label: string;
  style?: StyleProp<ViewStyle>;
}

/** Branded context strip for nested notebook screens. */
export function ContextHeader({ label, style }: ContextHeaderProps) {
  const { spacing } = useTheme();

  return (
    <View style={[{ marginBottom: spacing.lg, gap: spacing.sm }, style]}>
      <ThreeLines size="sm" align="left" />
      <SectionLabel label={label} />
    </View>
  );
}