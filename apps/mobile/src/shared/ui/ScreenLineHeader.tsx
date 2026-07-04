import { ReactNode, type RefObject } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from './Text';
import { useTheme } from '@/theme';

export interface ScreenLineHeaderProps {
  title: string;
  /** Full-width row below the title — right-aligned */
  subtitle?: string;
  /** Accent line under the subtitle text */
  subtitleUnderline?: boolean;
  /** Left side of the subtitle row — e.g. back control under the logo */
  contextLeading?: ReactNode;
  /** Auth screens — back button in the title row */
  leading?: ReactNode;
  /** Measured by the shell to place the floating menu logo */
  logoSlotRef?: RefObject<View | null>;
  onLogoSlotLayout?: () => void;
}

export function ScreenLineHeader({
  title,
  subtitle,
  subtitleUnderline = false,
  contextLeading,
  leading,
  logoSlotRef,
  onLogoSlotLayout,
}: ScreenLineHeaderProps) {
  const { colors, spacing } = useTheme();

  const leftContent = leading ? (
    <View style={styles.leadingSlot}>{leading}</View>
  ) : (
    <View
      ref={logoSlotRef}
      collapsable={false}
      onLayout={onLogoSlotLayout}
      style={styles.leadingSpacer}
    />
  );

  return (
    <View style={[styles.header, { gap: spacing.md, marginBottom: spacing.lg }]}>
      <View style={[styles.line, { backgroundColor: colors.primary }]} />

      <View style={styles.topRow}>
        {leftContent}
        <Text variant="sectionTitle" color="accent" style={styles.title}>
          {title}
        </Text>
      </View>

      {subtitle || contextLeading ? (
        <View style={[styles.subtitleRow, { gap: spacing.md }]}>
          {contextLeading ? <View style={styles.contextLeading}>{contextLeading}</View> : null}
          {subtitle ? (
            <View style={styles.subtitleTrailing}>
              {subtitleUnderline ? (
                <View style={[styles.subtitleHighlight, { gap: spacing.xs }]}>
                  <Text variant="bodySmall" color="secondary" style={styles.rightText}>
                    {subtitle}
                  </Text>
                  <View
                    style={[styles.subtitleLine, { backgroundColor: colors.primaryBorder }]}
                  />
                </View>
              ) : (
                <Text variant="bodySmall" color="secondary" style={styles.rightText}>
                  {subtitle}
                </Text>
              )}
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
  },
  line: {
    height: 3,
    borderRadius: 999,
    width: '100%',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'right',
    flexShrink: 1,
  },
  subtitleRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  contextLeading: {
    flexShrink: 0,
  },
  subtitleTrailing: {
    flexShrink: 1,
    marginLeft: 'auto',
    alignItems: 'flex-end',
  },
  subtitleHighlight: {
    maxWidth: '100%',
    alignSelf: 'flex-end',
    alignItems: 'stretch',
  },
  subtitleLine: {
    height: 1,
    borderRadius: 999,
    alignSelf: 'stretch',
  },
  rightText: {
    textAlign: 'right',
  },
  leadingSlot: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  leadingSpacer: {
    width: 44,
    height: 44,
  },
});
