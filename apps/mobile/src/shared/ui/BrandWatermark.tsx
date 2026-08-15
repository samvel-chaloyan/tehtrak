import { ImageBackground, StyleSheet, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

const brandLogoBlue = require('../../../assets/tehtrak_blue.png');

/** Soft identity wash — used as ImageBackground, not a sibling Image. */
const WATERMARK_OPACITY = 0.08;

export interface BrandWatermarkBackgroundProps {
  children: ReactNode;
  style?: ViewStyle;
}

/**
 * True background treatment: logo is the container image, children paint on top.
 */
export function BrandWatermarkBackground({
  children,
  style,
}: BrandWatermarkBackgroundProps) {
  return (
    <ImageBackground
      source={brandLogoBlue}
      resizeMode="contain"
      style={[styles.host, style]}
      imageStyle={styles.image}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    alignSelf: 'stretch',
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    opacity: WATERMARK_OPACITY,
    // Larger than default contain-fit so it fills the empty body as atmosphere.
    transform: [{ scale: 1.45 }],
  },
});
