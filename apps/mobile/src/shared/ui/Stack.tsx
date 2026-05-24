import { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from '@/theme';

type SpacingKey = keyof ReturnType<typeof useTheme>['spacing'];

export interface StackProps {
  children: ReactNode;
  gap?: SpacingKey;
  horizontal?: boolean;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  style?: StyleProp<ViewStyle>;
  flex?: number;
}

export function Stack({
  children,
  gap = 'md',
  horizontal = false,
  align,
  justify,
  style,
  flex,
}: StackProps) {
  const { spacing } = useTheme();
  const gapValue = spacing[gap];

  return (
    <View
      style={[
        {
          flex,
          flexDirection: horizontal ? 'row' : 'column',
          alignItems: align,
          justifyContent: justify,
          gap: gapValue,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
