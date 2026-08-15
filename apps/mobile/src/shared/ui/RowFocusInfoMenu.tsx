import { useEffect, useMemo } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

import type { CardAnchorLayout } from './WorkspaceGridCard';

export interface RowFocusInfoMenuProps {
  visible: boolean;
  layout: CardAnchorLayout | null;
  onInfo: () => void;
  onCancel: () => void;
}

const ACTION_SIZE = 48;
const ACTION_GAP = 12;
const CLUSTER_PAD = 10;

/**
 * Long-press on a notebook list row: dim the screen (same overlay as InfoDialog)
 * + a single info circle anchored near the row.
 */
export function RowFocusInfoMenu({
  visible,
  layout,
  onInfo,
  onCancel,
}: RowFocusInfoMenuProps) {
  const { colors, radius, shadows, spacing } = useTheme();
  const insets = useSafeAreaInsets();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(visible ? 1 : 0, {
      duration: visible ? 180 : 140,
      easing: Easing.out(Easing.cubic),
    });
  }, [visible, progress]);

  const clusterStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 8 }],
  }));

  const placement = useMemo(() => {
    if (!layout) {
      return null;
    }

    const screen = Dimensions.get('window');
    const clusterWidth = ACTION_SIZE + CLUSTER_PAD * 2;
    const clusterHeight = ACTION_SIZE + CLUSTER_PAD * 2;
    const spaceBelow = screen.height - (layout.y + layout.height) - insets.bottom;
    const placeBelow = spaceBelow >= clusterHeight + ACTION_GAP;

    let clusterTop = placeBelow
      ? layout.y + layout.height + ACTION_GAP
      : layout.y - clusterHeight - ACTION_GAP;
    clusterTop = Math.max(
      insets.top + spacing.sm,
      Math.min(clusterTop, screen.height - insets.bottom - clusterHeight - spacing.sm),
    );

    let clusterLeft = layout.x + (layout.width - clusterWidth) / 2;
    clusterLeft = Math.max(
      spacing.md,
      Math.min(clusterLeft, screen.width - clusterWidth - spacing.md),
    );

    return {
      cluster: { top: clusterTop, left: clusterLeft, width: clusterWidth, height: clusterHeight },
    };
  }, [layout, insets.bottom, insets.top, spacing.md, spacing.sm]);

  if (!visible || !placement) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent
    >
      <View style={[styles.root, { backgroundColor: colors.overlay }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Cancel"
          style={StyleSheet.absoluteFill}
          onPress={onCancel}
        />

        <Animated.View
          style={[
            styles.cluster,
            shadows.soft,
            clusterStyle,
            {
              top: placement.cluster.top,
              left: placement.cluster.left,
              width: placement.cluster.width,
              height: placement.cluster.height,
              backgroundColor: colors.surface,
              borderRadius: radius.full,
              paddingHorizontal: CLUSTER_PAD,
            },
          ]}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Info"
            hitSlop={6}
            onPress={onInfo}
            style={({ pressed }) => [
              styles.action,
              {
                width: ACTION_SIZE,
                height: ACTION_SIZE,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={colors.textSecondary}
            />
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  cluster: {
    position: 'absolute',
    zIndex: 3,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
