import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthBootstrap } from './AuthBootstrap';
import { DemoBanner } from './DemoBanner';
import { isDemoMode } from '@/config/demo';
import { logDemo } from '@/config/demoDebug';
import { RootNavigator } from '@/navigation';
import { ThemeProvider } from '@/theme';

if (isDemoMode) {
  logDemo('Demo mode active — backend disabled');
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: isDemoMode ? 0 : 1,
      staleTime: 30_000,
    },
  },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <StatusBar style="dark" />
          <DemoBanner />
          <AuthBootstrap>
            <RootNavigator />
          </AuthBootstrap>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
