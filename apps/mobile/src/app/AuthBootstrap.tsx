import { ReactNode, useEffect, useState } from 'react';
import { isDemoMode } from '@/config/demo';
import { ensureDemoInitialized } from '@/demo/state';
import { useSessionBootstrap } from '@/features/auth/hooks/useAuth';
import { useAppStore } from '@/store';
import { Loader } from '@/shared/ui';

export function AuthBootstrap({ children }: { children: ReactNode }) {
  const [bootReady, setBootReady] = useState(!isDemoMode);
  const { isPending, isError } = useSessionBootstrap({ enabled: bootReady });
  const hydrateFromStorage = useAppStore((s) => s.hydrateFromStorage);

  useEffect(() => {
    async function boot() {
      if (isDemoMode) {
        await ensureDemoInitialized();
      }
      await hydrateFromStorage();
      setBootReady(true);
    }

    void boot();
  }, [hydrateFromStorage]);

  const showLoader = !bootReady || (isPending && !(isDemoMode && isError));

  if (showLoader) {
    return <Loader fullScreen message="Opening your notebook…" />;
  }

  return <>{children}</>;
}
