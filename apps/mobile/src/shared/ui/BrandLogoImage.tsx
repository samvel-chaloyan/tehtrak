import { Image, StyleSheet } from 'react-native';

import { BRAND_LOGO_SIZE } from './brandLogoLayout';

const brandLogoBlue = require('../../../assets/tehtrak_blue.png');
const brandLogoWhite = require('../../../assets/tehtrak_white.png');

export interface BrandLogoImageProps {
  variant?: 'default' | 'white';
}

export function BrandLogoImage({ variant = 'default' }: BrandLogoImageProps) {
  return (
    <Image
      source={variant === 'white' ? brandLogoWhite : brandLogoBlue}
      resizeMode="contain"
      style={styles.logo}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: BRAND_LOGO_SIZE.width,
    height: BRAND_LOGO_SIZE.height,
  },
});
