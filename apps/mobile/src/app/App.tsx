import 'react-native-reanimated';
import { useFonts, IBMPlexSans_400Regular, IBMPlexSans_500Medium, IBMPlexSans_600SemiBold } from '@expo-google-fonts/ibm-plex-sans';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { type ReactNode } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthBootstrap } from './AuthBootstrap';
import { DemoBanner } from './DemoBanner';
import { isDemoMode } from '@/config/demo';
import { RootNavigator } from '@/navigation';
import { SheetHost } from '@/shared/ui';
import { ThemeProvider, useSurfaceStyles, useTheme } from '@/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: isDemoMode ? 0 : 1,
      staleTime: 30_000,
    },
  },
});

function AppRoot() {
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

function FontGate({ children }: { children: ReactNode }) {
  const { colors } = useTheme();
  const [loaded] = useFonts({
    IBMPlexSans_400Regular,
    IBMPlexSans_500Medium,
    IBMPlexSans_600SemiBold,
  });

  if (!loaded) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <FontGate>
            <AppRoot />
          </FontGate>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
