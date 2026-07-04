import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '@/theme';

type ThreeLinesSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type ThreeLinesTone = 'default' | 'brand';

export interface ThreeLinesProps {
  size?: ThreeLinesSize;
  tone?: ThreeLinesTone;
  align?: 'left' | 'center';
  style?: ViewStyle;
}

const LINE_WIDTHS: Record<ThreeLinesSize, [number, number, number]> = {
  sm: [24, 20, 16],
  md: [32, 28, 24],
  lg: [40, 36, 32],
  xl: [56, 48, 40],
  '2xl': [112, 96, 80],
};

const LINE_HEIGHTS: Record<ThreeLinesSize, number> = {
  sm: 2,
  md: 2.5,
  lg: 3,
  xl: 4,
  '2xl': 8,
};

const GAPS: Record<ThreeLinesSize, number> = {
  sm: 5,
  md: 6,
  lg: 7,
  xl: 9,
  '2xl': 18,
};

export function ThreeLines({
  size = 'md',
  tone = 'default',
  align = 'center',
  style,
}: ThreeLinesProps) {
  const { colors } = useTheme();
  const widths = LINE_WIDTHS[size];
  const lineHeight = LINE_HEIGHTS[size];
  const gap = GAPS[size];
  const lineColors =
    tone === 'brand'
      ? [colors.primary, colors.primary, colors.primary]
      : [colors.border, colors.primary, colors.border];
  const opacities = tone === 'brand' ? [0.85, 1, 0.85] : [0.5, 0.9, 0.5];

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
