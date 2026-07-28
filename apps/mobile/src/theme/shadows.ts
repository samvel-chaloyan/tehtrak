import { ViewStyle } from 'react-native';

/**
 * Quiet elevation — never heavy.
 * Prefer `soft` for surfaces; `raised` for chrome that must read against the canvas.
 */
export const shadows = {
  none: {},
  card: {
    shadowColor: '#1A2328',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  soft: {
    shadowColor: '#1A2328',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  /** Header / primary chrome — visible on light canvas without looking heavy. */
  raised: {
    shadowColor: '#1A2328',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 6,
  },
} as const satisfies Record<string, ViewStyle>;
