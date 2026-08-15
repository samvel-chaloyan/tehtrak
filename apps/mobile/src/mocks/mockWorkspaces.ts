import { Workspace } from '@/types';

const seededAt = '2026-01-15T10:00:00.000Z';

export const mockWorkspaces: Workspace[] = [
  {
    id: 'ws-parking',
    name: 'Riverside Parking',
    description: 'Daily vehicle entries, exits, and shift notes.',
    emoji: '🅿️',
    createdAt: seededAt,
    updatedAt: seededAt,
  },
  {
    id: 'ws-pantry',
    name: 'Home Pantry',
    description: 'Keep food organized before it expires.',
    emoji: '🥫',
    createdAt: seededAt,
    updatedAt: seededAt,
  },
  {
    id: 'ws-garden',
    name: 'Family Garden',
    description: 'Seasonal planting and harvest tracking.',
    emoji: '🌿',
    createdAt: seededAt,
    updatedAt: seededAt,
  },
  {
    id: 'ws-warehouse',
    name: 'Small Warehouse',
    description: 'Daily inventory and shelf locations.',
    emoji: '📦',
    createdAt: seededAt,
    updatedAt: seededAt,
  },
  {
    id: 'ws-cars',
    name: 'Car Maintenance',
    description: 'Service history for family vehicles.',
    emoji: '🚗',
    createdAt: seededAt,
    updatedAt: seededAt,
  },
  {
    id: 'ws-uni',
    name: 'University',
    description: 'Semester planning and coursework.',
    emoji: '📚',
    createdAt: seededAt,
    updatedAt: seededAt,
  },
  {
    id: 'ws-photo',
    name: 'Photography Studio',
    description: 'Client bookings and photo sessions.',
    emoji: '📷',
    createdAt: seededAt,
    updatedAt: seededAt,
  },
];
