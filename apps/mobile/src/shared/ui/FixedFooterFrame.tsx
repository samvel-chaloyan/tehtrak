import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { ScreenBottomBar } from './ScreenBottomBar';
import {
  ScreenFooterButtonCount,
  useScreenFooterLayout,
} from './screenFooterLayout';

export interface FixedFooterFrameProps {
  children: ReactNode;
  footer?: ReactNode;
  buttonCount?: ScreenFooterButtonCount;
}

/** Content area with an absolutely pinned bottom action slot. */
export function FixedFooterFrame({
  children,
  footer,
  buttonCount = 1,
}: FixedFooterFrameProps) {
  const { horizontalPadding, slotHeight } = useScreenFooterLayout(buttonCount);

  return (
    <View style={styles.frame}>
      <View
        style={[
          styles.body,
          {
            paddingHorizontal: horizontalPadding,
            paddingBottom: footer ? slotHeight : 0,
          },
        ]}
      >
        {children}
      </View>

      {footer ? (
        <View style={styles.footerSlot}>
          <ScreenBottomBar buttonCount={buttonCount}>{footer}</ScreenBottomBar>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    minHeight: 0,
    overflow: 'visible',
  },
  body: {
    flex: 1,
    minHeight: 0,
  },
  footerSlot: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 4,
  },
});
