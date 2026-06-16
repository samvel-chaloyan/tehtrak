import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

export interface ScreenMetaProps {
  label: string;
  style?: StyleProp<ViewStyle>;
}

/** Quiet metadata line below native navigation — never duplicates title. */
export function ScreenMeta({ label, style }: ScreenMetaProps) {
  const { spacing } = useTheme();

  return (
    <Text variant="caption" color="tertiary" style={[{ marginBottom: spacing.md }, style]}>
      {label}
    </Text>
  );
}
