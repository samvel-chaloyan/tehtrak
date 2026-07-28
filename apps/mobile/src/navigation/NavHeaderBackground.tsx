import { StyleSheet, View } from 'react-native';
import { useSurfaceStyles, useTheme } from '@/theme';

/** Native navigation header — canvas background, subtle divider. */
export function NavHeaderBackground() {
  const { colors } = useTheme();
  const surfaces = useSurfaceStyles();

  return (
    <View style={[styles.container, surfaces.canvas]}>
      <View style={[styles.border, { backgroundColor: colors.border }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  border: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
  },
});
