/**
 * Tehtrak color palette — see docs/frontend/design-tokens.md
 *
 * background: full-screen canvas (Apple system gray)
 * surface: grouped content, inputs, modals, cards
 * primary: logo cyan (#29B5E8)
 */
export const colors = {
  primary: '#29B5E8',
  primaryPressed: '#1FA3D4',
  primaryMuted: '#EEF6FA',
  background: '#F5F5F7',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  border: '#E5E7EB',
  borderLight: '#E5E7EB',
  borderSecondary: '#D1D5DB',
  textPrimary: '#48484A',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',
  danger: '#C85A5A',
  dangerMuted: '#FBF0F0',
  dangerEmphasis: '#CF9595',
  success: '#6FAF73',
  successMuted: '#F2F8F2',
  successEmphasis: '#84B588',
  warning: '#D4A15A',
  overlay: 'rgba(28, 28, 30, 0.4)',
  primaryBorder: 'rgba(41, 181, 232, 0.35)',
} as const;

export type Colors = typeof colors;
