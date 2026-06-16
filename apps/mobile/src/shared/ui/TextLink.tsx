import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Text } from './Text';

export interface TextLinkProps extends Omit<PressableProps, 'children' | 'style'> {
  label: string;
  emphasis?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function TextLink({ label, emphasis = true, style, ...props }: TextLinkProps) {
  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={8}
      style={[styles.base, style]}
      {...props}
    >
      <Text variant="body" color={emphasis ? 'accent' : 'secondary'} style={emphasis ? styles.emphasis : undefined}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
  },
  emphasis: {
    fontWeight: '500',
  },
});
