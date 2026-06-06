import { StyleProp, TextStyle } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

export interface PageTitleProps {
  children: string;
  style?: StyleProp<TextStyle>;
}

export function PageTitle({ children, style }: PageTitleProps) {
  const { spacing } = useTheme();

  return (
    <Text variant="titleLarge" style={[{ marginBottom: spacing.xs }, style]}>
      {children}
    </Text>
  );
}
