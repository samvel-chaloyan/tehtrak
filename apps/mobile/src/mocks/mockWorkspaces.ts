import { Workspace } from '@/types';

export const mockWorkspaces: Workspace[] = [
  {
    id: 'ws-parking',
    name: 'Riverside Parking',
    description: 'Daily vehicle entries, exits, and shift notes.',
    emoji: '🅿️',
  },
  {
    id: 'ws-pantry',
    name: 'Home Pantry',
    description: 'Keep food organized before it expires.',
    emoji: '🥫',
  },
  {
    id: 'ws-garden',
    name: 'Family Garden',
    description: 'Seasonal planting and harvest tracking.',
    emoji: '🌿',
  },
  {
    id: 'ws-warehouse',
    name: 'Small Warehouse',
    description: 'Daily inventory and shelf locations.',
    emoji: '📦',
  },
  {
    id: 'ws-cars',
    name: 'Car Maintenance',
    description: 'Service history for family vehicles.',
    emoji: '🚗',
  },
  {
    id: 'ws-uni',
    name: 'University',
    description: 'Semester planning and coursework.',
    emoji: '📚',
  },
  {
    id: 'ws-photo',
    name: 'Photography Studio',
    description: 'Client bookings and photo sessions.',
    emoji: '📷',
  },
];
