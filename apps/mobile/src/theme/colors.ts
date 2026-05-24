export const colors = {
  primary: '#29B5E8',
  primaryMuted: '#E8F7FC',
  background: '#FFFFFF',
  surface: '#F8FAFB',
  surfaceElevated: '#FFFFFF',
  border: '#E8ECEF',
  borderLight: '#F0F3F5',
  textPrimary: '#1A2328',
  textSecondary: '#5C6B73',
  textTertiary: '#8A969C',
  danger: '#D64545',
  dangerMuted: '#FDF0F0',
  success: '#2D8A5E',
  successMuted: '#EDF7F1',
  overlay: 'rgba(26, 35, 40, 0.4)',
} as const;

export type Colors = typeof colors;
