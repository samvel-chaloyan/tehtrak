import { ReactNode, useEffect } from 'react';
import { useSessionBootstrap } from '@/features/auth/hooks/useAuth';
import { useAppStore } from '@/store';
import { Loader } from '@/shared/ui';

export function AuthBootstrap({ children }: { children: ReactNode }) {
  const { isPending } = useSessionBootstrap();
  const hydrateFromStorage = useAppStore((s) => s.hydrateFromStorage);

  useEffect(() => {
    void hydrateFromStorage();
  }, [hydrateFromStorage]);

  if (isPending) {
    return <Loader fullScreen message="Opening your notebook…" />;
  }

  return <>{children}</>;
}
