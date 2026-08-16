import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useCachedGlobalSearch } from '@/features/search/hooks/useCachedGlobalSearch';
import type { GlobalSearchHit } from '@/features/search/utils/searchCachedCatalog';
import { AppScreenProps } from '@/navigation/types';
import { useAppStore } from '@/store';
import {
  AppScreenShell,
  EmptyListContent,
  NotebookListShelf,
  NotebookRow,
  SectionHeader,
} from '@/shared/ui';
import { useTheme } from '@/theme';

/**
 * Drawer global search — filters already-fetched workspaces, collections, and items.
 * Does not hit the network; results grow as the user visits more places.
 */
export function GlobalSearchScreen({ navigation }: AppScreenProps<'GlobalSearch'>) {
  const { spacing } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const results = useCachedGlobalSearch(searchQuery);
  const selectWorkspace = useAppStore((s) => s.selectWorkspace);

  useEffect(() => {
    // Fresh entry from the drawer — start with an empty field.
    setSearchQuery('');
  }, []);

  const exit = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const openHit = useCallback(
    (hit: GlobalSearchHit) => {
      selectWorkspace(hit.workspaceId);

      if (hit.kind === 'workspace') {
        navigation.navigate('CollectionList', {
          workspaceId: hit.workspaceId,
          workspaceName: hit.workspaceName,
        });
        return;
      }

      if (hit.kind === 'collection' && hit.collectionId && hit.collectionName) {
        navigation.navigate('CollectionDetails', {
          workspaceId: hit.workspaceId,
          collectionId: hit.collectionId,
          collectionName: hit.collectionName,
        });
        return;
      }

      if (
        hit.kind === 'item' &&
        hit.collectionId &&
        hit.collectionName &&
        hit.itemId
      ) {
        navigation.navigate('ItemDetails', {
          workspaceId: hit.workspaceId,
          collectionId: hit.collectionId,
          collectionName: hit.collectionName,
          itemId: hit.itemId,
        });
      }
    },
    [navigation, selectWorkspace],
  );

  const trimmed = searchQuery.trim();
  const showBlank = !trimmed;
  const showEmpty = Boolean(trimmed) && results.total === 0;

  return (
    <AppScreenShell
      navigation={navigation}
      title="Search"
      subtitle="Notebooks"
      subtitleUnderline
      onBack={exit}
      searchActive
      searchQuery={searchQuery}
      searchPlaceholder="Find a place, section, or page"
      onSearchQueryChange={setSearchQuery}
      onSearchCancel={exit}
    >
      {showBlank ? (
        <NotebookListShelf countLabel="…" framed={false} countColor="tertiary">
          <EmptyListContent
            title="Search your notebook"
            description="Looks through workspaces, collections, and items you’ve already opened on this device."
          />
        </NotebookListShelf>
      ) : showEmpty ? (
        <NotebookListShelf countLabel="0" framed={false} countColor="tertiary">
          <EmptyListContent
            title="Nothing matched"
            description="Try another word, or open a collection first so its items are available to search."
          />
        </NotebookListShelf>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{
            paddingBottom: spacing.xl,
            gap: spacing.lg,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {results.workspaces.length > 0 ? (
            <ResultGroup
              title="Workspaces"
              accent="workspace"
              hits={results.workspaces}
              onPress={openHit}
            />
          ) : null}
          {results.collections.length > 0 ? (
            <ResultGroup
              title="Collections"
              accent="collection"
              hits={results.collections}
              onPress={openHit}
            />
          ) : null}
          {results.items.length > 0 ? (
            <ResultGroup
              title="Items"
              accent="item"
              hits={results.items}
              onPress={openHit}
            />
          ) : null}
        </ScrollView>
      )}
    </AppScreenShell>
  );
}

function ResultGroup({
  title,
  accent,
  hits,
  onPress,
}: {
  title: string;
  accent: 'workspace' | 'collection' | 'item';
  hits: GlobalSearchHit[];
  onPress: (hit: GlobalSearchHit) => void;
}) {
  const { spacing } = useTheme();

  return (
    <View style={styles.group}>
      <View style={{ paddingHorizontal: spacing.lg }}>
        <SectionHeader title={title} />
      </View>
      <NotebookListShelf
        countLabel={`${hits.length}`}
        accent={accent}
        framed={false}
        fill={false}
        countColor="tertiary"
      >
        {hits.map((hit, index) => (
          <NotebookRow
            key={`${hit.kind}-${hit.id}`}
            title={hit.title}
            description={hit.meta}
            size="collection"
            onPress={() => onPress(hit)}
            showDivider={index < hits.length - 1}
          />
        ))}
      </NotebookListShelf>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  group: {
    width: '100%',
  },
});
