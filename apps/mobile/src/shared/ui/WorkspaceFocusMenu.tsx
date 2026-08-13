import { useEffect, useMemo } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

import { WorkspaceGridCard, WORKSPACE_GRID_CARD_HEIGHT, type CardAnchorLayout } from './WorkspaceGridCard';

export type { CardAnchorLayout };

export interface WorkspaceFocusMenuProps {
  visible: boolean;
  layout: CardAnchorLayout | null;
  title: string;
  metaLines: string[];
  onEdit: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

const ACTION_SIZE = 48;
const ACTION_GAP = 12;
const CLUSTER_PAD = 10;
const SEPARATOR_HEIGHT = 22;

/**
 * Long-press focus mode: blur the world, keep the chosen place card sharp,
 * and anchor edit / delete / cancel icons to that card.
 */
export function WorkspaceFocusMenu({
  visible,
  layout,
  title,
  metaLines,
  onEdit,
  onDelete,
  onCancel,
}: WorkspaceFocusMenuProps) {
  const { colors, radius, shadows, spacing } = useTheme();
  const insets = useSafeAreaInsets();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(visible ? 1 : 0, {
      duration: visible ? 220 : 160,
      easing: Easing.out(Easing.cubic),
    });
  }, [visible, progress]);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  const cardLiftStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 0.98 + progress.value * 0.04 }],
  }));

  const clusterStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 8 }],
  }));

  const placement = useMemo(() => {
    if (!layout) {
      return null;
    }

    const screen = Dimensions.get('window');
    // 3 actions + 2 hairlines + gaps matching the nav capsule rhythm
    const clusterWidth =
      ACTION_SIZE * 3 +
      StyleSheet.hairlineWidth * 2 +
      spacing.sm * 4 +
      CLUSTER_PAD * 2;
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
      card: layout,
      cluster: { top: clusterTop, left: clusterLeft, width: clusterWidth, height: clusterHeight },
    };
  }, [layout, insets.bottom, insets.top, spacing.md, spacing.sm]);

  if (!visible || !placement) {
    return null;
  }

  const separator = (
    <View style={[styles.separator, { backgroundColor: colors.border }]} />
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onCancel}
      statusBarTranslucent
    >
      <View style={styles.root}>
        <Animated.View style={[styles.blurHost, fadeStyle]}>
          <BlurView intensity={28} tint="light" style={StyleSheet.absoluteFill} />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Cancel"
            style={[styles.scrim, { backgroundColor: 'rgba(28, 28, 30, 0.18)' }]}
            onPress={onCancel}
          />
        </Animated.View>

        <Animated.View
          pointerEvents="box-none"
          style={[
            styles.cardAnchor,
            cardLiftStyle,
            {
              top: placement.card.y,
              left: placement.card.x,
              width: placement.card.width,
              height: placement.card.height || WORKSPACE_GRID_CARD_HEIGHT,
            },
          ]}
        >
          <WorkspaceGridCard title={title} metaLines={metaLines} />
        </Animated.View>

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
              gap: spacing.sm,
            },
          ]}
        >
          <IconAction
            label="Cancel"
            icon="chevron-back"
            color={colors.textSecondary}
            onPress={onCancel}
          />
          {separator}
          <IconAction
            label="Edit"
            icon="create-outline"
            color={colors.successEmphasis}
            onPress={onEdit}
          />
          {separator}
          <IconAction
            label="Delete"
            icon="trash-outline"
            color={colors.danger}
            onPress={onDelete}
          />
        </Animated.View>
      </View>
    </Modal>
  );
}

function IconAction({
  label,
  icon,
  color,
  onPress,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={6}
      onPress={onPress}
      style={({ pressed }) => [
        styles.action,
        {
          width: ACTION_SIZE,
          height: ACTION_SIZE,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Ionicons name={icon} size={20} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  blurHost: {
    ...StyleSheet.absoluteFill,
  },
  scrim: {
    ...StyleSheet.absoluteFill,
  },
  cardAnchor: {
    position: 'absolute',
    zIndex: 2,
  },
  cluster: {
    position: 'absolute',
    zIndex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: StyleSheet.hairlineWidth,
    height: SEPARATOR_HEIGHT,
    flexShrink: 0,
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
