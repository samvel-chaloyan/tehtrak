import { ReactNode } from 'react';
import { Keyboard, Pressable, ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';

export interface ScreenProps {
  children: ReactNode;
  scroll?: boolean;
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  edges?: ('top' | 'bottom')[];
}

export function Screen({
  children,
  scroll = false,
  padded = true,
  style,
  contentStyle,
  edges = ['top', 'bottom'],
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const { colors, spacing } = useTheme();

  const paddingTop = (edges.includes('top') ? insets.top : 0) + spacing.lg;
  const paddingBottom = (edges.includes('bottom') ? insets.bottom : 0) + spacing.xl;
  const horizontalPadding = padded ? spacing.lg : 0;

  const containerStyle = [
    styles.container,
    {
      backgroundColor: colors.background,
      paddingTop,
      paddingBottom,
      paddingHorizontal: horizontalPadding,
    },
    style,
  ];

  if (scroll) {
    return (
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top + spacing.lg }]}
        contentContainerStyle={[
          {
            paddingBottom: (edges.includes('bottom') ? insets.bottom : 0) + spacing.xl,
            paddingHorizontal: horizontalPadding,
          },
          contentStyle,
        ]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        automaticallyAdjustKeyboardInsets={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <Pressable style={containerStyle} onPress={Keyboard.dismiss} accessible={false}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
