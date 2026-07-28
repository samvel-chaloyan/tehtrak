import { Ionicons } from '@expo/vector-icons';
import { ReactNode, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import { useTheme } from '@/theme';

const ACTION_WIDTH = 72;
const ICON_SIZE = 22;

export interface SwipeableRowProps {
  children: ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function SwipeableRow({ children, onEdit, onDelete }: SwipeableRowProps) {
  const { colors, spacing } = useTheme();
  const swipeRef = useRef<Swipeable>(null);
  const actionFiredRef = useRef(false);

  const close = () => {
    swipeRef.current?.close();
  };

  const handleSwipeOpen = (direction: 'left' | 'right') => {
    if (actionFiredRef.current) {
      return;
    }
    actionFiredRef.current = true;

    if (direction === 'left' && onEdit) {
      onEdit();
    } else if (direction === 'right' && onDelete) {
      onDelete();
    }

    close();
    requestAnimationFrame(() => {
      actionFiredRef.current = false;
    });
  };

  const renderLeftActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    if (!onEdit) {
      return null;
    }

    const translateX = dragX.interpolate({
      inputRange: [0, ACTION_WIDTH],
      outputRange: [-ACTION_WIDTH, 0],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.actionSlot, { transform: [{ translateX }] }]}>
        <View
          style={[
            styles.action,
            {
              backgroundColor: colors.successMuted,
              paddingHorizontal: spacing.md,
            },
          ]}
        >
          <Ionicons name="create-outline" size={ICON_SIZE} color={colors.successEmphasis} />
        </View>
      </Animated.View>
    );
  };

  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    if (!onDelete) {
      return null;
    }

    const translateX = dragX.interpolate({
      inputRange: [-ACTION_WIDTH, 0],
      outputRange: [0, ACTION_WIDTH],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.actionSlot, { transform: [{ translateX }] }]}>
        <View
          style={[
            styles.action,
            {
              backgroundColor: colors.dangerMuted,
              paddingHorizontal: spacing.md,
            },
          ]}
        >
          <Ionicons name="trash-outline" size={ICON_SIZE} color={colors.dangerEmphasis} />
        </View>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      ref={swipeRef}
      friction={1.5}
      overshootLeft={false}
      overshootRight={false}
      leftThreshold={ACTION_WIDTH * 0.6}
      rightThreshold={ACTION_WIDTH * 0.6}
      onSwipeableOpen={handleSwipeOpen}
      renderLeftActions={onEdit ? renderLeftActions : undefined}
      renderRightActions={onDelete ? renderRightActions : undefined}
    >
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  actionSlot: {
    width: ACTION_WIDTH,
  },
  action: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
