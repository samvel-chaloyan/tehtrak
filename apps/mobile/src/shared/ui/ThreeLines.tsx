import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '@/theme';

type ThreeLinesSize = 'sm' | 'md' | 'lg';

export interface ThreeLinesProps {
  size?: ThreeLinesSize;
  align?: 'left' | 'center';
  style?: ViewStyle;
}

const LINE_WIDTHS: Record<ThreeLinesSize, [number, number, number]> = {
  sm: [24, 20, 16],
  md: [32, 28, 24],
  lg: [40, 36, 32],
};

const LINE_HEIGHTS: Record<ThreeLinesSize, number> = {
  sm: 2,
  md: 2.5,
  lg: 3,
};

const GAPS: Record<ThreeLinesSize, number> = {
  sm: 5,
  md: 6,
  lg: 7,
};

export function ThreeLines({ size = 'md', align = 'center', style }: ThreeLinesProps) {
  const { colors } = useTheme();
  const widths = LINE_WIDTHS[size];
  const lineHeight = LINE_HEIGHTS[size];
  const gap = GAPS[size];
  const lineColors = [colors.border, colors.primary, colors.border];
  const opacities = [0.5, 0.9, 0.5];

  return (
    <View
      style={[
        styles.container,
        align === 'center' ? styles.center : styles.left,
        { gap },
        style,
      ]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      {widths.map((width, index) => (
        <View
          key={index}
          style={{
            width,
            height: lineHeight,
            backgroundColor: lineColors[index],
            borderRadius: lineHeight,
            opacity: opacities[index],
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  center: {
    alignSelf: 'center',
  },
  left: {
    alignSelf: 'flex-start',
  },
});
