import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSurfaceStyles, useTheme } from '@/theme';
import { Text } from './Text';

export interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export function Loader({ message, fullScreen = false }: LoaderProps) {
  const { colors, spacing } = useTheme();
  const surfaces = useSurfaceStyles();

  return (
    <View
      style={[
        styles.container,
        surfaces.canvas,
        { padding: spacing.lg },
        fullScreen && styles.fullScreen,
      ]}
    >
      <ActivityIndicator size="large" color={colors.primary} />
      {message ? (
        <Text variant="bodySmall" color="secondary" style={{ marginTop: spacing.md }}>
          {message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    flex: 1,
  },
});
