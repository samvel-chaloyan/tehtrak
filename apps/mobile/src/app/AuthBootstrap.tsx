import { ReactNode } from 'react';
import { useSessionBootstrap } from '@/features/auth/hooks/useAuth';
import { Loader } from '@/shared/ui';

export function AuthBootstrap({ children }: { children: ReactNode }) {
  const { isPending } = useSessionBootstrap();

  if (isPending) {
    return <Loader fullScreen message="Opening your notebook…" />;
  }

  return <>{children}</>;
}
