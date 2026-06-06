export const colors = {
  primary: '#29B5E8',
  primaryMuted: '#E8F7FC',
  background: '#FFFFFF',
  surface: '#F8FAFC',
  surfaceElevated: '#FFFFFF',
  border: '#E2E8F0',
  borderLight: '#E2E8F0',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textTertiary: '#94A3B8',
  danger: '#DC2626',
  dangerMuted: '#FEF2F2',
  success: '#16A34A',
  successMuted: '#F0FDF4',
  warning: '#D97706',
  overlay: 'rgba(15, 23, 42, 0.4)',
} as const;

export type Colors = typeof colors;
