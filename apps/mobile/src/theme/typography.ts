import { TextStyle } from 'react-native';

/**
 * IBM Plex Sans — single family for all Tehtrak UI.
 * Each weight is its own face (required for reliable RN rendering).
 */
export const fontFamily = {
  regular: 'IBMPlexSans_400Regular',
  medium: 'IBMPlexSans_500Medium',
  semibold: 'IBMPlexSans_600SemiBold',
} as const;

export type FontWeightToken = '400' | '500' | '600' | '700' | 'normal' | 'bold' | 'medium' | 'semibold';

/** Map a CSS-like weight to the loaded Plex face. */
export function fontFamilyForWeight(weight?: string | number | null): string {
  const value = String(weight ?? '400');
  if (
    value === '500' ||
    value === 'medium'
  ) {
    return fontFamily.medium;
  }
  if (
    value === '600' ||
    value === '700' ||
    value === 'semibold' ||
    value === 'bold' ||
    value === 'heavy'
  ) {
    return fontFamily.semibold;
  }
  return fontFamily.regular;
}

export const typography = {
  display: {
    fontFamily: fontFamily.semibold,
    fontSize: 48,
    fontWeight: '600',
    lineHeight: 54,
    letterSpacing: -0.8,
  },
  titleLarge: {
    fontFamily: fontFamily.semibold,
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 34,
    letterSpacing: -0.4,
  },
  sectionTitle: {
    fontFamily: fontFamily.semibold,
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  title: {
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
    letterSpacing: -0.1,
  },
  subtitle: {
    fontFamily: fontFamily.medium,
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 26,
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 26,
  },
  bodySmall: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;
