import 'react-native-reanimated';
import { useFonts, IBMPlexSans_400Regular, IBMPlexSans_500Medium, IBMPlexSans_600SemiBold } from '@expo-google-fonts/ibm-plex-sans';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthBootstrap } from './AuthBootstrap';
import { DemoBanner } from './DemoBanner';
import { isDemoMode } from '@/config/demo';
import { RootNavigator } from '@/navigation';
import { SheetHost } from '@/shared/ui';
import { ThemeProvider, useSurfaceStyles } from '@/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: isDemoMode ? 0 : 1,
      staleTime: 30_000,
    },
  },
});

function AppRoot() {
  // Load fonts without blocking the UI — avoids infinite spinner if load hangs.
  useFonts({
    IBMPlexSans_400Regular,
    IBMPlexSans_500Medium,
    IBMPlexSans_600SemiBold,
  });

  const surfaces = useSurfaceStyles();

  return (
    <GestureHandlerRootView style={[surfaces.canvas, { flex: 1 }]}>
      <StatusBar style="dark" />
      <DemoBanner />
      <SheetHost>
        <AuthBootstrap>
          <RootNavigator />
        </AuthBootstrap>
      </SheetHost>
    </GestureHandlerRootView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AppRoot />
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
