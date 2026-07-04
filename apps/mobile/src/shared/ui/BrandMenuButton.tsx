import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { BrandLogoImage } from './BrandLogoImage';
import {
  BRAND_LOGO_MARGIN_LEFT,
  BRAND_LOGO_TOUCH,
} from './brandLogoLayout';

export interface BrandMenuButtonProps {
  onPress: () => void;
  /** Fixed shell anchor — exact touch box, no flow margin */
  fixed?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function BrandMenuButton({ onPress, fixed = false, style }: BrandMenuButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Open menu"
      hitSlop={fixed ? undefined : 8}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        fixed && styles.buttonFixed,
        style,
        { opacity: pressed ? 0.75 : 1 },
      ]}
    >
      <BrandLogoImage />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: BRAND_LOGO_TOUCH,
    minHeight: BRAND_LOGO_TOUCH,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: BRAND_LOGO_MARGIN_LEFT,
  },
  buttonFixed: {
    width: BRAND_LOGO_TOUCH,
    height: BRAND_LOGO_TOUCH,
    minWidth: BRAND_LOGO_TOUCH,
    minHeight: BRAND_LOGO_TOUCH,
    marginLeft: 0,
  },
});
