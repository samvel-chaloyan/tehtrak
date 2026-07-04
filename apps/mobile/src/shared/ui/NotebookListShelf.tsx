import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { NotebookIndexFrame } from './NotebookIndex';
import { ScreenMeta } from './ScreenMeta';
import { useTheme } from '@/theme';

export interface NotebookListShelfProps {
  countLabel: string;
  footerLeft?: ReactNode;
  children: ReactNode;
}

/** Framed list with optional footer row: action left, count right. */
export function NotebookListShelf({ countLabel, footerLeft, children }: NotebookListShelfProps) {
  const { spacing } = useTheme();

  return (
    <View style={styles.section}>
      <NotebookIndexFrame>{children}</NotebookIndexFrame>
      <View
        style={[
          styles.footerRow,
          {
            marginTop: spacing.md,
            gap: spacing.md,
          },
        ]}
      >
        {footerLeft ? <View style={styles.footerLeft}>{footerLeft}</View> : <View style={styles.footerLeft} />}
        <ScreenMeta label={countLabel} color="secondary" align="right" style={styles.footerMeta} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    minHeight: 0,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLeft: {
    flex: 1,
    flexShrink: 1,
  },
  footerMeta: {
    marginBottom: 0,
    flexShrink: 0,
  },
});
