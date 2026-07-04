import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

type ScreenMetaColor = 'secondary' | 'tertiary';
type ScreenMetaAlign = 'left' | 'right';

export interface ScreenMetaProps {
  label: string;
  color?: ScreenMetaColor;
  align?: ScreenMetaAlign;
  style?: StyleProp<ViewStyle>;
}

/** Quiet metadata line — never duplicates title. */
export function ScreenMeta({
  label,
  color = 'tertiary',
  align = 'left',
  style,
}: ScreenMetaProps) {
  const { spacing } = useTheme();

  return (
    <Text
      variant="caption"
      color={color}
      style={[{ marginBottom: spacing.md, textAlign: align }, style]}
    >
      {label}
    </Text>
  );
}
