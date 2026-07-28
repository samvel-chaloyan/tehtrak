import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { BrandLogoImage } from './BrandLogoImage';
import {
  BRAND_LOGO_MARGIN_LEFT,
  BRAND_LOGO_SIZE,
  BRAND_LOGO_TOUCH,
} from './brandLogoLayout';

export interface BrandMenuButtonProps {
  onPress: () => void;
  /** Fixed shell anchor — exact touch box, no flow margin */
  fixed?: boolean;
  /** In brand header card — no negative margin offset */
  inline?: boolean;
  logoVariant?: 'default' | 'white';
  style?: StyleProp<ViewStyle>;
}

export function BrandMenuButton({
  onPress,
  fixed = false,
  inline = false,
  logoVariant = 'default',
  style,
}: BrandMenuButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Open menu"
      hitSlop={
        inline
          ? {
              top: 7,
              bottom: 7,
              left: 2,
              right: 2,
            }
          : fixed
            ? undefined
            : 8
      }
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        fixed && styles.buttonFixed,
        inline && styles.buttonInline,
        style,
        { opacity: pressed ? 0.75 : 1 },
      ]}
    >
      <BrandLogoImage variant={logoVariant} />
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
  buttonInline: {
    width: BRAND_LOGO_SIZE.width,
    height: BRAND_LOGO_SIZE.height,
    minWidth: BRAND_LOGO_SIZE.width,
    minHeight: BRAND_LOGO_SIZE.height,
    marginLeft: 0,
  },
});
