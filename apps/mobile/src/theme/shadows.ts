import { ViewStyle } from 'react-native';

export const shadows = {
  none: {},
  card: {
    shadowColor: '#1A2328',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  soft: {
    shadowColor: '#1A2328',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
} as const satisfies Record<string, ViewStyle>;
