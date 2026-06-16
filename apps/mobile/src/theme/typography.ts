import { TextStyle } from 'react-native';

export const fontFamily = {
  regular: undefined as string | undefined,
  medium: undefined as string | undefined,
  semibold: undefined as string | undefined,
};

export const typography = {
  titleLarge: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 38,
    letterSpacing: -0.4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
    letterSpacing: -0.1,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 26,
  },
  body: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 26,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;
