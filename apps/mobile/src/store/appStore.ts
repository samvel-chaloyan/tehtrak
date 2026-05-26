import { create } from 'zustand';
import { appConfig } from '@/config/app';
import type { ApiUser } from '@/core/api/types';
import { getString, setString } from '@/services/storage';

function loadSelectedWorkspaceId(): string | null {
  return getString(appConfig.storageKeys.selectedWorkspaceId) ?? null;
}

interface AppState {
  isAuthenticated: boolean;
  user: ApiUser | null;
  selectedWorkspaceId: string | null;

  setAuthenticated: (value: boolean) => void;
  setUser: (user: ApiUser | null) => void;
  selectWorkspace: (workspaceId: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isAuthenticated: false,
  user: null,
  selectedWorkspaceId: loadSelectedWorkspaceId(),

  setAuthenticated: (value) => set({ isAuthenticated: value }),

  setUser: (user) => set({ user }),

  selectWorkspace: (workspaceId) => {
    setString(appConfig.storageKeys.selectedWorkspaceId, workspaceId);
    set({ selectedWorkspaceId: workspaceId });
  },
}));
