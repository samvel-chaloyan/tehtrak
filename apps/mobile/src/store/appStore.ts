import { create } from 'zustand';
import { appConfig } from '@/config/app';
import type { ApiUser } from '@/core/api/types';
import { getString, setString } from '@/services/storage';

interface AppState {
  isAuthenticated: boolean;
  user: ApiUser | null;
  selectedWorkspaceId: string | null;

  setAuthenticated: (value: boolean) => void;
  setUser: (user: ApiUser | null) => void;
  selectWorkspace: (workspaceId: string) => void;
  /** Loads persisted workspace selection after startup (async storage). */
  hydrateFromStorage: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  isAuthenticated: false,
  user: null,
  selectedWorkspaceId: null,

  setAuthenticated: (value) => set({ isAuthenticated: value }),

  setUser: (user) => set({ user }),

  selectWorkspace: (workspaceId) => {
    void setString(appConfig.storageKeys.selectedWorkspaceId, workspaceId);
    set({ selectedWorkspaceId: workspaceId });
  },

  hydrateFromStorage: async () => {
    const id = await getString(appConfig.storageKeys.selectedWorkspaceId);
    if (id) {
      set({ selectedWorkspaceId: id });
    }
  },
}));
