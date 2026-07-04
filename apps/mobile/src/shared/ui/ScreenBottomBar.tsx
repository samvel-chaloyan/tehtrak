import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  ScreenFooterButtonCount,
  useScreenFooterLayout,
} from './screenFooterLayout';

export interface ScreenBottomBarProps {
  children: ReactNode;
  buttonCount?: ScreenFooterButtonCount;
}

/** Canonical padded slot for bottom actions — one source of truth for position. */
export function ScreenBottomBar({ children, buttonCount = 1 }: ScreenBottomBarProps) {
  const { horizontalPadding, topPadding, bottomInset } = useScreenFooterLayout(buttonCount);

  return (
    <View
      style={[
        styles.bar,
        {
          paddingHorizontal: horizontalPadding,
          paddingTop: topPadding,
          paddingBottom: bottomInset,
        },
      ]}
      pointerEvents="box-none"
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: '100%',
  },
});
