import { Item } from '@/types';

export const mockItems: Item[] = [
  {
    id: 'item-1',
    collectionId: 'col-winter-food',
    data: {
      name: 'Sauerkraut jar (large)',
      quantity: 3,
      expires_on: '2026-08-15',
      storage_location: 'cellar_a',
      opened: false,
    },
    createdAt: '2026-01-12T10:00:00Z',
    updatedAt: '2026-05-20T09:00:00Z',
  },
  {
    id: 'item-2',
    collectionId: 'col-winter-food',
    data: {
      name: 'Frozen berry mix',
      quantity: 2,
      expires_on: '2026-11-01',
      storage_location: 'freezer',
      opened: true,
    },
    createdAt: '2026-02-03T10:00:00Z',
    updatedAt: '2026-05-22T18:30:00Z',
  },
  {
    id: 'item-3',
    collectionId: 'col-winter-food',
    data: {
      name: 'Dried apple rings',
      quantity: 5,
      expires_on: '2026-09-30',
      storage_location: 'pantry',
      opened: false,
    },
    createdAt: '2026-03-18T10:00:00Z',
    updatedAt: '2026-05-24T08:15:00Z',
  },
  {
    id: 'item-4',
    collectionId: 'col-parking-log',
    data: {
      plate_number: '12-AB-345',
      entry_time: '2026-05-24T07:45:00Z',
      shift: 'morning',
      overnight: false,
    },
    createdAt: '2026-05-24T07:45:00Z',
    updatedAt: '2026-05-24T07:45:00Z',
  },
  {
    id: 'item-5',
    collectionId: 'col-parking-log',
    data: {
      plate_number: '88-ZZ-102',
      entry_time: '2026-05-24T13:20:00Z',
      shift: 'afternoon',
      overnight: true,
    },
    createdAt: '2026-05-24T13:20:00Z',
    updatedAt: '2026-05-24T14:02:00Z',
  },
  {
    id: 'item-6',
    collectionId: 'col-intake',
    data: {
      sku: 'BX-4421',
      pallet_count: 4,
      received_on: '2026-05-24T08:00:00Z',
      inspected: true,
    },
    createdAt: '2026-05-24T08:30:00Z',
    updatedAt: '2026-05-24T11:20:00Z',
  },
  {
    id: 'item-7',
    collectionId: 'col-intake',
    data: {
      sku: 'PL-9088',
      pallet_count: 2,
      received_on: '2026-05-23T15:00:00Z',
      inspected: false,
    },
    createdAt: '2026-05-23T15:10:00Z',
    updatedAt: '2026-05-23T15:10:00Z',
  },
  {
    id: 'item-8',
    collectionId: 'col-harvest',
    data: {
      crop: 'Cherry tomatoes',
      weight_kg: 2.4,
      picked_on: '2026-05-21T16:00:00Z',
      planned_use: 'fresh',
    },
    createdAt: '2026-05-21T17:10:00Z',
    updatedAt: '2026-05-21T17:10:00Z',
  },
  {
    id: 'item-9',
    collectionId: 'col-home-supplies',
    data: {
      name: 'Dish soap (refill)',
      units_left: 1,
    },
    createdAt: '2026-05-10T12:00:00Z',
    updatedAt: '2026-05-23T19:40:00Z',
  },
];
