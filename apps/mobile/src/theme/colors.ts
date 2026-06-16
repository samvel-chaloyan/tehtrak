export const colors = {
  primary: '#5CA9D6',
  primaryPressed: '#4E9BC7',
  primaryMuted: '#EEF6FA',
  background: '#F8F8F6',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  border: '#E8EAED',
  borderLight: '#E8EAED',
  borderSecondary: '#D9DDE3',
  textPrimary: '#1E2430',
  textSecondary: '#667085',
  textTertiary: '#98A2B3',
  textInverse: '#FFFFFF',
  danger: '#C85A5A',
  dangerMuted: '#FBF0F0',
  success: '#6FAF73',
  successMuted: '#F2F8F2',
  warning: '#D4A15A',
  overlay: 'rgba(30, 36, 48, 0.4)',
  primaryBorder: 'rgba(92, 169, 214, 0.28)',
} as const;

export type Colors = typeof colors;
