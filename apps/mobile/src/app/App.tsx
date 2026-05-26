import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthBootstrap } from './AuthBootstrap';
import { RootNavigator } from '@/navigation';
import { ThemeProvider } from '@/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
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
          <AuthBootstrap>
            <RootNavigator />
          </AuthBootstrap>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
