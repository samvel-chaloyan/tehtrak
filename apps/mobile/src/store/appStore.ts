import { create } from 'zustand';
import { appConfig } from '@/config/app';
import {
  mockCollections,
  mockFields,
  mockItems,
  mockWorkspaces,
} from '@/mocks';
import { getBoolean, getString, setBoolean, setString } from '@/services/storage';
import { DraftProperty, Item, PropertyField } from '@/types';

function loadSelectedWorkspaceId(): string | null {
  return getString(appConfig.storageKeys.selectedWorkspaceId) ?? mockWorkspaces[0]?.id ?? null;
}

function loadAuthenticated(): boolean {
  return getBoolean(appConfig.storageKeys.sessionAuthenticated) ?? false;
}

interface AppState {
  isAuthenticated: boolean;
  selectedWorkspaceId: string | null;
  items: Item[];
  extraFields: PropertyField[];
  extraCollections: typeof mockCollections;

  setAuthenticated: (value: boolean) => void;
  selectWorkspace: (workspaceId: string) => void;
  addItem: (item: Item) => void;
  addProperty: (field: PropertyField) => void;
  addCollection: (collection: (typeof mockCollections)[number]) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  isAuthenticated: loadAuthenticated(),
  selectedWorkspaceId: loadSelectedWorkspaceId(),
  items: [...mockItems],
  extraFields: [],
  extraCollections: [],

  setAuthenticated: (value) => {
    setBoolean(appConfig.storageKeys.sessionAuthenticated, value);
    set({ isAuthenticated: value });
  },

  selectWorkspace: (workspaceId) => {
    setString(appConfig.storageKeys.selectedWorkspaceId, workspaceId);
    set({ selectedWorkspaceId: workspaceId });
  },

  addItem: (item) => {
    set({ items: [item, ...get().items] });
  },

  addProperty: (field) => {
    set({ extraFields: [...get().extraFields, field] });
  },

  addCollection: (collection) => {
    set({ extraCollections: [...get().extraCollections, collection] });
  },
}));

export function getAllWorkspaces() {
  return mockWorkspaces;
}

export function getAllCollections(workspaceId: string) {
  const state = useAppStore.getState();
  return [...mockCollections, ...state.extraCollections].filter(
    (c) => c.workspaceId === workspaceId,
  );
}

export function getAllFields(collectionId: string) {
  const state = useAppStore.getState();
  return [...mockFields, ...state.extraFields]
    .filter((f) => f.collectionId === collectionId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getAllItems(collectionId: string) {
  return useAppStore.getState().items.filter((i) => i.collectionId === collectionId);
}
