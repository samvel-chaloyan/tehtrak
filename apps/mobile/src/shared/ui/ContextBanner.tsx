import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { WorkspaceRecentAvatar } from '@/features/workspaces/components/WorkspaceRecentAvatar';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/typography';

import { RunningText } from './RunningText';
import { ShellBackLink } from './ShellBackLink';

/** Ambient band height — root screens without a places capsule. */
export const CONTEXT_BANNER_HEIGHT = 36;

/** Soft nav / places capsule height. */
export const CONTEXT_CAPSULE_HEIGHT = 52;

/** Equal air above and below the capsule (header ↔ list midline). Matches `spacing.list`. */
export const CONTEXT_CAPSULE_GAP = 12;

/** Calm ambient lines for root screens without recent places. */
export const DEFAULT_CONTEXT_BANNER_MESSAGES = [
  'Welcome back.',
  'Everything is up to date.',
  'Continue where you left off.',
  'Your notebooks are ready.',
  'Last updated today.',
  'A calm place for the work that matters — your notebooks stay organized and ready when you return.',
] as const;

/** How long each message stays fully visible. */
const HOLD_MS = 6500;
/** Fade out / fade in duration. */
const FADE_MS = 400;
/** Max wait for the new line to measure before fading in. */
const MEASURE_BUDGET_MS = 180;

export interface ContextRecentPlace {
  id: string;
  label: string;
  initials: string;
  emphasized?: boolean;
  onPress: () => void;
}

export interface ContextBannerProps {
  messages?: readonly string[];
  contextLabel?: string;
  onBack?: () => void;
  /** Enter search — icon only; no blue accent. */
  onSearch?: () => void;
  /**
   * Root Workspaces capsule — story-style recent places (initials)
   * with search on the right. Replaces ambient copy when provided.
   */
  recentPlaces?: ContextRecentPlace[];
  /** Capsule becomes a focused search field; body filters live. */
  searchActive?: boolean;
  searchQuery?: string;
  searchPlaceholder?: string;
  onSearchQueryChange?: (query: string) => void;
  onSearchCancel?: () => void;
}

/**
 * Band under the blue header.
 * Root places: soft capsule — recent circles | search (or inline search field).
 * Nested: soft white nav capsule — back | label | search.
 * Fallback root: ambient rotating copy.
 */
export function ContextBanner({
  messages,
  contextLabel,
  onBack,
  onSearch,
  recentPlaces,
  searchActive = false,
  searchQuery = '',
  searchPlaceholder = 'Find a place',
  onSearchQueryChange,
  onSearchCancel,
}: ContextBannerProps) {
  const { colors, shadows, spacing, typography } = useTheme();
  const [labelWidth, setLabelWidth] = useState(0);
  const searchRef = useRef<TextInput>(null);
  const isNested = Boolean(onBack || contextLabel);
  const isPlacesHome = !isNested && recentPlaces !== undefined;

  useEffect(() => {
    if (!searchActive) {
      return;
    }
    const timer = setTimeout(() => {
      searchRef.current?.focus();
    }, 40);
    return () => clearTimeout(timer);
  }, [searchActive]);

  if (searchActive) {
    return (
      <View
        style={[
          styles.capsuleSlot,
          {
            paddingHorizontal: spacing.lg,
            paddingVertical: CONTEXT_CAPSULE_GAP,
          },
        ]}
      >
        <View
          style={[
            styles.capsule,
            shadows.soft,
            {
              height: CONTEXT_CAPSULE_HEIGHT,
              backgroundColor: colors.surface,
              borderRadius: CONTEXT_CAPSULE_HEIGHT / 2,
              paddingLeft: spacing.sm,
              paddingRight: spacing.sm,
              gap: spacing.sm,
            },
          ]}
        >
          <ShellBackLink onPress={() => onSearchCancel?.()} compact />
          <View style={[styles.separator, { backgroundColor: colors.border, marginLeft: -spacing.sm }]} />
          <TextInput
            ref={searchRef}
            value={searchQuery}
            onChangeText={onSearchQueryChange}
            placeholder={searchPlaceholder}
            placeholderTextColor={colors.textTertiary}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            clearButtonMode="never"
            style={[
              styles.searchInput,
              typography.bodySmall,
              {
                color: colors.textPrimary,
                fontFamily: fontFamily.regular,
              },
            ]}
          />
          {searchQuery.length > 0 ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Clear search"
              hitSlop={8}
              onPress={() => onSearchQueryChange?.('')}
              style={({ pressed }) => [styles.searchButton, { opacity: pressed ? 0.7 : 1 }]}
            >
              <Ionicons name="close-circle" size={20} color={colors.textTertiary} />
            </Pressable>
          ) : (
            <View style={styles.sidePlaceholder} pointerEvents="none">
              <Ionicons name="search-outline" size={20} color={colors.textTertiary} />
            </View>
          )}
        </View>
      </View>
    );
  }

  if (isNested) {
    return (
      <View
        style={[
          styles.capsuleSlot,
          {
            paddingHorizontal: spacing.lg,
            paddingVertical: CONTEXT_CAPSULE_GAP,
          },
        ]}
      >
        <View
          style={[
            styles.capsule,
            shadows.soft,
            {
              height: CONTEXT_CAPSULE_HEIGHT,
              backgroundColor: colors.surface,
              borderRadius: CONTEXT_CAPSULE_HEIGHT / 2,
              paddingLeft: spacing.sm,
              paddingRight: spacing.md,
              gap: spacing.sm,
            },
          ]}
        >
          {onBack ? <ShellBackLink onPress={onBack} compact /> : <View style={styles.sidePlaceholder} />}

          <View
            style={[
              styles.separator,
              {
                backgroundColor: colors.border,
                marginLeft: -spacing.sm,
              },
            ]}
          />

          <View
            style={styles.capsuleLabel}
            onLayout={(event) => {
              const width = Math.floor(event.nativeEvent.layout.width);
              if (width > 0 && width !== labelWidth) {
                setLabelWidth(width);
              }
            }}
          >
            {contextLabel ? (
              <RunningText
                text={contextLabel}
                color={colors.textSecondary}
                align="left"
                availableWidth={labelWidth > 0 ? labelWidth : undefined}
              />
            ) : null}
          </View>

          <SearchButton onPress={onSearch} />
        </View>
      </View>
    );
  }

  if (isPlacesHome) {
    return (
      <View
        style={[
          styles.capsuleSlot,
          {
            paddingHorizontal: spacing.lg,
            paddingVertical: CONTEXT_CAPSULE_GAP,
          },
        ]}
      >
        <View
          style={[
            styles.capsule,
            shadows.soft,
            {
              height: CONTEXT_CAPSULE_HEIGHT,
              backgroundColor: colors.surface,
              borderRadius: CONTEXT_CAPSULE_HEIGHT / 2,
              paddingLeft: spacing.md,
              paddingRight: spacing.sm,
              gap: spacing.sm,
            },
          ]}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.placesRow, { gap: spacing.sm }]}
            style={styles.placesScroll}
          >
            {recentPlaces.length > 0 ? (
              recentPlaces.map((place) => (
                <WorkspaceRecentAvatar
                  key={place.id}
                  initials={place.initials}
                  label={place.label}
                  emphasized={place.emphasized}
                  onPress={place.onPress}
                />
              ))
            ) : (
              <View style={styles.placesEmpty} />
            )}
          </ScrollView>

          <View style={[styles.separator, { backgroundColor: colors.border }]} />
          <SearchButton onPress={onSearch} />
        </View>
      </View>
    );
  }

  const lines =
    messages && messages.length > 0 ? messages : DEFAULT_CONTEXT_BANNER_MESSAGES;

  return (
    <View
      style={[
        styles.banner,
        styles.ambient,
        {
          height: CONTEXT_BANNER_HEIGHT,
          paddingHorizontal: spacing.lg,
        },
      ]}
    >
      <RotatingAmbientMessage messages={lines} />
    </View>
  );
}

function SearchButton({ onPress }: { onPress?: () => void }) {
  const { colors } = useTheme();

  if (!onPress) {
    return <View style={styles.sidePlaceholder} />;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Search"
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [styles.searchButton, { opacity: pressed ? 0.7 : 1 }]}
    >
      <Ionicons name="search-outline" size={20} color={colors.textSecondary} />
    </Pressable>
  );
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function RotatingAmbientMessage({ messages }: { messages: readonly string[] }) {
  const { colors } = useTheme();
  const [index, setIndex] = useState(0);
  const opacity = useSharedValue(1);
  const messagesKey = useMemo(() => messages.join('\u0000'), [messages]);
  const messagesRef = useRef(messages);
  const readyRef = useRef<(() => void) | null>(null);
  messagesRef.current = messages;

  useEffect(() => {
    setIndex(0);
    opacity.value = 1;
  }, [messagesKey, opacity]);

  useEffect(() => {
    if (messagesRef.current.length <= 1) {
      return;
    }

    let cancelled = false;

    const waitUntilReady = () =>
      new Promise<void>((resolve) => {
        let settled = false;
        const finish = () => {
          if (settled) {
            return;
          }
          settled = true;
          readyRef.current = null;
          resolve();
        };

        readyRef.current = finish;
        void wait(MEASURE_BUDGET_MS).then(finish);
      });

    const run = async () => {
      while (!cancelled) {
        await wait(HOLD_MS);
        if (cancelled) {
          return;
        }

        opacity.value = withTiming(0, {
          duration: FADE_MS,
          easing: Easing.out(Easing.cubic),
        });
        await wait(FADE_MS);
        if (cancelled) {
          return;
        }

        setIndex((current) => (current + 1) % messagesRef.current.length);
        await waitUntilReady();
        if (cancelled) {
          return;
        }

        opacity.value = withTiming(1, {
          duration: FADE_MS,
          easing: Easing.out(Easing.cubic),
        });
        await wait(FADE_MS);
      }
    };

    void run();

    return () => {
      cancelled = true;
      readyRef.current = null;
    };
  }, [messagesKey, opacity]);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const line = messages[index] ?? messages[0] ?? '';

  return (
    <Animated.View style={[styles.ambientTrack, fadeStyle]}>
      <RunningText
        key={line}
        text={line}
        color={colors.textSecondary}
        align="center"
        onReady={() => {
          readyRef.current?.();
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: '100%',
  },
  ambient: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  ambientTrack: {
    width: '100%',
    justifyContent: 'center',
  },
  capsuleSlot: {
    width: '100%',
  },
  capsule: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    width: StyleSheet.hairlineWidth,
    height: 22,
    flexShrink: 0,
  },
  capsuleLabel: {
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 0,
    margin: 0,
  },
  placesScroll: {
    flex: 1,
    minWidth: 0,
  },
  placesRow: {
    alignItems: 'center',
    paddingVertical: 2,
  },
  placesEmpty: {
    height: 36,
    minWidth: 8,
  },
  sidePlaceholder: {
    width: 36,
    height: 36,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    width: 36,
    height: 36,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
