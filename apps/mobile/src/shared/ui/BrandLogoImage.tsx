import { Image, StyleSheet } from 'react-native';

import { BRAND_LOGO_SIZE } from './brandLogoLayout';

const brandLogo = require('../../../assets/tehtrak_big.png');

export function BrandLogoImage() {
  return <Image source={brandLogo} resizeMode="contain" style={styles.logo} />;
}

const styles = StyleSheet.create({
  logo: {
    width: BRAND_LOGO_SIZE.width,
    height: BRAND_LOGO_SIZE.height,
  },
});
