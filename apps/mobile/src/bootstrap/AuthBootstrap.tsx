import { ReactNode, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { apiConfig } from '@/config/api';
import { isDemoMode } from '@/config/demo';
import { queryKeys } from '@/core/api';
import { ensureDemoInitialized } from '@/demo/state';
import { restoreSession } from '@/features/auth/api';
import { usePinStore } from '@/features/pins/store';
import { useAppStore } from '@/store';
import { Loader } from '@/shared/ui/Loader';

/** Hard cap — never leave the splash hanging (Fast Refresh / slow LAN). */
const BOOT_SAFETY_MS = 3000;
const SESSION_WAIT_MS = 2500;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | 'timeout' | null> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve('timeout'), ms);
    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch(() => {
        clearTimeout(timer);
        resolve(null);
      });
  });
}

export function AuthBootstrap({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    let active = true;

    const finish = () => {
      if (active) {
        setReady(true);
      }
    };

    // Absolute failsafe — ignores session work still in flight.
    const safety = setTimeout(finish, BOOT_SAFETY_MS);

    async function boot() {
      const { setAuthenticated, setUser } = useAppStore.getState();

      if (__DEV__) {
        console.log(`[boot] demo=${isDemoMode} api=${apiConfig.baseUrl}`);
      }

      try {
        if (isDemoMode) {
          await ensureDemoInitialized();
        }
        await useAppStore.getState().hydrateFromStorage();
        await usePinStore.getState().hydrate();

        const result = await withTimeout(restoreSession(), SESSION_WAIT_MS);
        if (!active) return;

        if (result && result !== 'timeout') {
          setUser(result);
          setAuthenticated(true);
          queryClient.setQueryData(queryKeys.me, result);
        } else {
          if (__DEV__ && result === 'timeout') {
            console.warn('[boot] session restore timed out — showing welcome');
          }
          setUser(null);
          setAuthenticated(false);
          queryClient.setQueryData(queryKeys.me, null);
        }
      } catch (error) {
        if (__DEV__) {
          console.warn('[boot] failed', error);
        }
        if (!active) return;
        setUser(null);
        setAuthenticated(false);
        queryClient.setQueryData(queryKeys.me, null);
      } finally {
        clearTimeout(safety);
        finish();
      }
    }

    void boot();

    return () => {
      active = false;
      clearTimeout(safety);
    };
  }, [queryClient]);

  if (!ready) {
    return <Loader fullScreen message="Opening your notebook…" />;
  }

  return <>{children}</>;
}
