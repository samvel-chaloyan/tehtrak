import { ReactNode, type RefObject } from 'react';
import { StyleSheet, View } from 'react-native';

import { BrandMenuButton } from './BrandMenuButton';
import { Text } from './Text';
import { useTheme } from '@/theme';

export type ScreenLineHeaderTone = 'default' | 'quiet' | 'brand';

export interface ScreenLineHeaderProps {
  title: string;
  /** Legacy non-brand layouts */
  subtitle?: string;
  subtitleUnderline?: boolean;
  tone?: ScreenLineHeaderTone;
  contextLeading?: ReactNode;
  leading?: ReactNode;
  logoSlotRef?: RefObject<View | null>;
  onLogoSlotLayout?: () => void;
  onMenuPress?: () => void;
  menuLogoVariant?: 'default' | 'white';
}

export function ScreenLineHeader({
  title,
  subtitle,
  subtitleUnderline = false,
  tone = 'brand',
  contextLeading,
  leading,
  logoSlotRef,
  onLogoSlotLayout,
  onMenuPress,
  menuLogoVariant = 'white',
}: ScreenLineHeaderProps) {
  const { colors, spacing } = useTheme();
  const isQuiet = tone === 'quiet';
  const isBrand = tone === 'brand';

  const leftContent = leading ? (
    <View style={styles.leadingSlot}>{leading}</View>
  ) : isBrand && onMenuPress ? (
    <View
      ref={logoSlotRef}
      collapsable={false}
      onLayout={onLogoSlotLayout}
      style={styles.brandMenuAnchor}
    >
      <BrandMenuButton inline logoVariant={menuLogoVariant} onPress={onMenuPress} />
    </View>
  ) : (
    <View
      ref={logoSlotRef}
      collapsable={false}
      onLayout={onLogoSlotLayout}
      style={styles.leadingSpacer}
    />
  );

  if (isBrand) {
    return (
      <View style={styles.header}>
        <View style={[styles.brandRow, { gap: spacing.sm }]}>
          {leftContent}
          <Text variant="title" color="inverse" style={styles.brandTitle}>
            {title}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.header,
        { gap: spacing.md, marginBottom: isQuiet ? spacing.xl : spacing.lg },
      ]}
    >
      <View
        style={[
          styles.line,
          { backgroundColor: isQuiet ? colors.border : colors.primary },
        ]}
      />

      <View style={styles.topRow}>
        {leftContent}
        <Text
          variant="sectionTitle"
          color={isQuiet ? 'primary' : 'accent'}
          style={styles.title}
        >
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
                    style={[
                      styles.subtitleLine,
                      {
                        backgroundColor: isQuiet ? colors.border : colors.primaryBorder,
                      },
                    ]}
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
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandTitle: {
    textAlign: 'right',
    flexShrink: 1,
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
  brandMenuAnchor: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
