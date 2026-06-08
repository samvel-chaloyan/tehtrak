import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/core/api';
import type { ApiUser } from '@/core/api/types';
import { isDemoMode } from '@/config/demo';
import { logDemo } from '@/config/demoDebug';
import { useAppStore } from '@/store';
import { fetchMe, loginUser, logoutUser, registerUser, restoreSession } from '../api';

function applyAuthenticatedUser(
  user: ApiUser,
  setUser: (user: ApiUser | null) => void,
  setAuthenticated: (value: boolean) => void,
) {
  setUser(user);
  setAuthenticated(true);
}

export function useSessionBootstrap(options?: { enabled?: boolean }) {
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const setUser = useAppStore((s) => s.setUser);

  return useQuery({
    queryKey: queryKeys.me,
    enabled: options?.enabled ?? true,
    queryFn: async () => {
      try {
        const user = await restoreSession();
        if (user) {
          applyAuthenticatedUser(user, setUser, setAuthenticated);
          return user;
        }
      } catch (error) {
        if (isDemoMode) {
          logDemo('Session bootstrap failed — showing welcome');
        } else {
          throw error;
        }
      }

      setAuthenticated(false);
      setUser(null);
      return null;
    },
    retry: false,
    staleTime: Infinity,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const setUser = useAppStore((s) => s.setUser);

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: (data) => {
      applyAuthenticatedUser(data.user, setUser, setAuthenticated);
      queryClient.setQueryData(queryKeys.me, data.user);
      if (isDemoMode) {
        logDemo('Login complete — entering app');
      }
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const setUser = useAppStore((s) => s.setUser);

  return useMutation({
    mutationFn: ({
      email,
      password,
      displayName,
    }: {
      email: string;
      password: string;
      displayName: string;
    }) => registerUser(email, password, displayName),
    onSuccess: (data) => {
      applyAuthenticatedUser(data.user, setUser, setAuthenticated);
      queryClient.setQueryData(queryKeys.me, data.user);
      if (isDemoMode) {
        logDemo('Register complete — entering app');
      }
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const setUser = useAppStore((s) => s.setUser);

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setUser(null);
      setAuthenticated(false);
      queryClient.clear();
      if (isDemoMode) {
        logDemo('Signed out — returning to welcome');
      }
    },
  });
}

export function useMe() {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: fetchMe,
    enabled: useAppStore.getState().isAuthenticated && !isDemoMode,
    retry: false,
  });
}
