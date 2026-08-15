import { ReactNode, useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { apiConfig } from '@/config/api';
import { isDemoMode } from '@/config/demo';
import { clearTokens, queryKeys } from '@/core/api';
import { ensureDemoInitialized } from '@/demo/state';
import { restoreSession } from '@/features/auth/api';
import { usePinStore } from '@/features/pins/store';
import { useAppStore } from '@/store';
import { Loader } from '@/shared/ui/Loader';

const BOOT_TIMEOUT_MS = 4000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), ms);
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
  const readyRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const markReady = () => {
      if (cancelled || readyRef.current) return;
      readyRef.current = true;
      setReady(true);
    };

    const safety = setTimeout(markReady, BOOT_TIMEOUT_MS);

    async function boot() {
      const { setAuthenticated, setUser } = useAppStore.getState();

      if (__DEV__) {
        console.log(
          `[boot] demo=${isDemoMode} api=${apiConfig.baseUrl}`,
        );
      }

      try {
        if (isDemoMode) {
          await ensureDemoInitialized();
        }
        await useAppStore.getState().hydrateFromStorage();
        await usePinStore.getState().hydrate();

        const user = await withTimeout(restoreSession(), BOOT_TIMEOUT_MS - 500);
        if (cancelled) return;

        if (user) {
          setUser(user);
          setAuthenticated(true);
          queryClient.setQueryData(queryKeys.me, user);
        } else {
          // Timed out or no session — clear any half-broken tokens so we don't loop.
          if (!isDemoMode) {
            await clearTokens();
          }
          setUser(null);
          setAuthenticated(false);
          queryClient.setQueryData(queryKeys.me, null);
        }
      } catch (error) {
        if (__DEV__) {
          console.warn('[boot] failed', error);
        }
        setUser(null);
        setAuthenticated(false);
        queryClient.setQueryData(queryKeys.me, null);
      } finally {
        clearTimeout(safety);
        markReady();
      }
    }

    void boot();

    return () => {
      cancelled = true;
      clearTimeout(safety);
    };
  }, [queryClient]);

  if (!ready) {
    return <Loader fullScreen message="Opening your notebook…" />;
  }

  return <>{children}</>;
}
