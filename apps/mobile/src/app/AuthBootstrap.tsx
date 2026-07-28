import { ReactNode, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/core/api';
import { isDemoMode } from '@/config/demo';
import { ensureDemoInitialized } from '@/demo/state';
import { restoreSession } from '@/features/auth/api';
import { useAppStore } from '@/store';
import { Loader } from '@/shared/ui/Loader';

export function AuthBootstrap({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      const { setAuthenticated, setUser } = useAppStore.getState();

      try {
        if (isDemoMode) {
          await ensureDemoInitialized();
        }
        await useAppStore.getState().hydrateFromStorage();

        try {
          const user = await restoreSession();
          if (user) {
            setUser(user);
            setAuthenticated(true);
            queryClient.setQueryData(queryKeys.me, user);
          } else {
            setUser(null);
            setAuthenticated(false);
            queryClient.setQueryData(queryKeys.me, null);
          }
        } catch {
          setUser(null);
          setAuthenticated(false);
          queryClient.setQueryData(queryKeys.me, null);
        }
      } finally {
        if (!cancelled) {
          setReady(true);
        }
      }
    }

    void boot();

    return () => {
      cancelled = true;
    };
  }, [queryClient]);

  if (!ready) {
    return <Loader fullScreen message="Opening your notebook…" />;
  }

  return <>{children}</>;
}
