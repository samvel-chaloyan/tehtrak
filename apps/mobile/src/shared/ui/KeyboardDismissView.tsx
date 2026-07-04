import { ReactNode } from 'react';
import { Keyboard, StyleProp, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';

export interface KeyboardDismissViewProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** Dismisses the keyboard when tapping outside focused inputs. */
export function KeyboardDismissView({ children, style }: KeyboardDismissViewProps) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[{ flex: 1 }, style]}>{children}</View>
    </TouchableWithoutFeedback>
  );
}
