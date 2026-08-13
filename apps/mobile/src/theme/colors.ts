/**
 * Tehtrak color palette — see docs/frontend/design-tokens.md
 *
 * background: full-screen canvas (Apple system gray)
 * surface: grouped content, inputs, modals, cards
 * primary: brand blue (#00BBFF)
 */
export const colors = {
  primary: '#00BBFF',
  primaryPressed: '#00A3E0',
  primaryMuted: '#E5F9FF',
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
  warningMuted: '#F8F3EA',
  /** Quick Access / pin entity accents — not decorative chrome. */
  entityWorkspace: '#00BBFF',
  entityWorkspaceMuted: '#E5F9FF',
  entityCollection: '#F5C85F',
  entityCollectionMuted: '#FBF6E8',
  entityItem: '#34C759',
  entityItemMuted: '#EAF9EE',
  bookmark: '#D9B44A',
  bookmarkMuted: '#F8F4E8',
  overlay: 'rgba(28, 28, 30, 0.4)',
  primaryBorder: 'rgba(0, 187, 255, 0.35)',
} as const;

export type Colors = typeof colors;
