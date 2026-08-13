import { ScrollView, StyleSheet, View } from 'react-native';

import { useResolvedPins } from '@/features/pins/hooks/useResolvedPins';
import { navigateToPin } from '@/features/pins/utils/resolvePin';
import { AppScreenProps } from '@/navigation/types';
import { useAppStore } from '@/store';
import {
  AppScreenShell,
  EmptyListContent,
  NotebookListShelf,
  NotebookRow,
  SectionHeader,
  SkeletonList,
} from '@/shared/ui';
import { useTheme } from '@/theme';
import type { Pin } from '@/types';

/**
 * Drawer management screen for pinned objects — grouped by type.
 * Home dock is the shortcut; this screen is for browsing and unpinning.
 */
export function QuickAccessScreen({ navigation }: AppScreenProps<'QuickAccess'>) {
  const { spacing } = useTheme();
  const { resolved, isLoading } = useResolvedPins();
  const selectWorkspace = useAppStore((s) => s.selectWorkspace);

  const workspacePins = resolved.filter((r) => r.pin.type === 'workspace' && r.resolvable);
  const collectionPins = resolved.filter((r) => r.pin.type === 'collection' && r.resolvable);
  const itemPins = resolved.filter((r) => r.pin.type === 'item' && r.resolvable);
  const total = workspacePins.length + collectionPins.length + itemPins.length;

  const openPin = (pin: Pin, title: string) => {
    if (pin.type === 'workspace') {
      selectWorkspace(pin.workspaceId);
    }
    navigateToPin(navigation, pin, title);
  };

  return (
    <AppScreenShell
      navigation={navigation}
      title="Quick Access"
      subtitle="Pinned"
      subtitleUnderline
      onBack={() => navigation.goBack()}
    >
      {isLoading ? (
        <NotebookListShelf countLabel="…" framed={false} countColor="tertiary">
          <SkeletonList count={4} />
        </NotebookListShelf>
      ) : total === 0 ? (
        <NotebookListShelf countLabel="0 pinned" framed={false} countColor="tertiary">
          <EmptyListContent
            title="Nothing pinned yet"
            description="Pin a workspace, collection, or item to keep it in Quick Access."
          />
        </NotebookListShelf>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{
            paddingBottom: spacing.xl,
            gap: spacing.lg,
          }}
          showsVerticalScrollIndicator={false}
        >
          {workspacePins.length > 0 ? (
            <View style={styles.group}>
              <View style={{ paddingHorizontal: spacing.lg }}>
                <SectionHeader title="Workspaces" />
              </View>
              <NotebookListShelf
                countLabel={`${workspacePins.length}`}
                accent="workspace"
                framed={false}
                fill={false}
                countColor="tertiary"
              >
                {workspacePins.map((item, index) => (
                  <NotebookRow
                    key={item.pin.id}
                    title={item.title}
                    size="collection"
                    pinTarget={{
                      type: 'workspace',
                      workspaceId: item.pin.workspaceId,
                    }}
                    onPress={() => openPin(item.pin, item.title)}
                    showDivider={index < workspacePins.length - 1}
                  />
                ))}
              </NotebookListShelf>
            </View>
          ) : null}

          {collectionPins.length > 0 ? (
            <View style={styles.group}>
              <View style={{ paddingHorizontal: spacing.lg }}>
                <SectionHeader title="Collections" />
              </View>
              <NotebookListShelf
                countLabel={`${collectionPins.length}`}
                accent="collection"
                framed={false}
                fill={false}
                countColor="tertiary"
              >
                {collectionPins.map((item, index) => (
                  <NotebookRow
                    key={item.pin.id}
                    title={item.title}
                    size="collection"
                    pinTarget={{
                      type: 'collection',
                      workspaceId: item.pin.workspaceId,
                      collectionId: item.pin.collectionId!,
                    }}
                    onPress={() => openPin(item.pin, item.title)}
                    showDivider={index < collectionPins.length - 1}
                  />
                ))}
              </NotebookListShelf>
            </View>
          ) : null}

          {itemPins.length > 0 ? (
            <View style={styles.group}>
              <View style={{ paddingHorizontal: spacing.lg }}>
                <SectionHeader title="Items" />
              </View>
              <NotebookListShelf
                countLabel={`${itemPins.length}`}
                accent="item"
                framed={false}
                fill={false}
                countColor="tertiary"
              >
                {itemPins.map((item, index) => (
                  <NotebookRow
                    key={item.pin.id}
                    title={item.title}
                    size="item"
                    pinTarget={{
                      type: 'item',
                      workspaceId: item.pin.workspaceId,
                      collectionId: item.pin.collectionId!,
                      itemId: item.pin.itemId!,
                    }}
                    onPress={() => openPin(item.pin, item.title)}
                    showDivider={index < itemPins.length - 1}
                  />
                ))}
              </NotebookListShelf>
            </View>
          ) : null}
        </ScrollView>
      )}
    </AppScreenShell>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  group: {
    overflow: 'visible',
  },
});
