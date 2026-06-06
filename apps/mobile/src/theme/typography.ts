import { TextStyle } from 'react-native';

export const fontFamily = {
  regular: undefined as string | undefined,
  medium: undefined as string | undefined,
  semibold: undefined as string | undefined,
};

export const typography = {
  titleLarge: {
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 34,
    letterSpacing: -0.3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.1,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
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
