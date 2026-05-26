import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/core/api';
import { useAppStore } from '@/store';
import { fetchMe, loginUser, logoutUser, registerUser, restoreSession } from '../api';

export function useSessionBootstrap() {
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const setUser = useAppStore((s) => s.setUser);

  return useQuery({
    queryKey: queryKeys.me,
    queryFn: async () => {
      const user = await restoreSession();
      if (user) {
        setUser(user);
        setAuthenticated(true);
        return user;
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
      setUser(data.user);
      setAuthenticated(true);
      queryClient.setQueryData(queryKeys.me, data.user);
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
      setUser(data.user);
      setAuthenticated(true);
      queryClient.setQueryData(queryKeys.me, data.user);
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
    },
  });
}

export function useMe() {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: fetchMe,
    enabled: useAppStore.getState().isAuthenticated,
  });
}
