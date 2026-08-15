import { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  useDeleteCollection,
  useCollections,
} from '@/features/collections/hooks/useCollections';
import { AppScreenProps } from '@/navigation/types';
import { safeGoBack } from '@/navigation/safeGoBack';
import {
  AppScreenShell,
  EmptyListContent,
  EmptyNotebook,
  NotebookListShelf,
  NotebookRow,
  ScrollIndicatorFlatList,
  SingleBottomButton,
  SkeletonList,
  SwipeableRow,
} from '@/shared/ui';
import type { Collection } from '@/types';
import { confirmDelete } from '@/utils/confirmDelete';
import { formatRelativeTime, getScreenErrorMessage } from '@/utils';

function collectionCountLabel(count: number) {
  return count === 1 ? '1 collection' : `${count} collections`;
}

function matchesCollectionQuery(collection: Collection, query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return false;
  }

  const name = collection.name.toLowerCase();
  const description = (collection.description ?? '').toLowerCase();
  return name.includes(normalized) || description.includes(normalized);
}

export function CollectionListScreen({ navigation, route }: AppScreenProps<'CollectionList'>) {
  const { workspaceId, workspaceName } = route.params;
  const { data: collections, isLoading, isError, error, refetch, isRefetching } =
    useCollections(workspaceId);
  const deleteCollection = useDeleteCollection(workspaceId);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const enterSearch = useCallback(() => {
    setSearchQuery('');
    setSearchActive(true);
  }, []);

  const exitSearch = useCallback(() => {
    setSearchActive(false);
    setSearchQuery('');
  }, []);

  const collectionList = collections ?? [];

  const filteredCollections = useMemo(() => {
    if (!searchActive) {
      return collectionList;
    }
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      return [];
    }
    return collectionList.filter((collection) =>
      matchesCollectionQuery(collection, trimmed),
    );
  }, [collectionList, searchActive, searchQuery]);

  const newCollectionFooter = (
    <SingleBottomButton
      action={{
        label: 'New collection',
        icon: 'add-outline',
        onPress: () => navigation.navigate('CreateCollection', { workspaceId, workspaceName }),
      }}
    />
  );

  const retryFooter = (
    <SingleBottomButton
      action={{
        label: 'Retry',
        onPress: () => refetch(),
      }}
    />
  );

  const searchShellProps = {
    searchActive,
    searchQuery,
    searchPlaceholder: 'Find a collection',
    onSearchQueryChange: setSearchQuery,
    onSearchCancel: exitSearch,
  };

  const shellProps = {
    navigation,
    title: 'Collections',
    subtitle: workspaceName,
    subtitleUnderline: true,
    onBack: () =>
      safeGoBack(navigation, () => navigation.navigate('WorkspaceList')),
    onSearch: enterSearch,
    ...searchShellProps,
  };

  const listCount = searchActive ? filteredCollections.length : collectionList.length;

  if (isLoading) {
    return (
      <AppScreenShell {...shellProps}>
        <NotebookListShelf countLabel={collectionCountLabel(0)} accent="collection" framed={false} countColor="tertiary">
          <SkeletonList count={4} />
        </NotebookListShelf>
      </AppScreenShell>
    );
  }

  if (isError) {
    return (
      <AppScreenShell {...shellProps} footer={retryFooter}>
        <NotebookListShelf countLabel={collectionCountLabel(0)} accent="collection" framed={false} countColor="tertiary">
          <EmptyListContent
            title="Could not load collections"
            description={getScreenErrorMessage(
              error,
              'Pull to refresh or try again in a moment.',
            )}
          />
        </NotebookListShelf>
      </AppScreenShell>
    );
  }

  const count = collectionList.length;

  if (!count) {
    return (
      <AppScreenShell {...shellProps} footer={newCollectionFooter}>
        <NotebookListShelf countLabel={collectionCountLabel(count)} accent="collection" framed={false} countColor="tertiary">
          <EmptyNotebook
            title="Open a new section"
            description="Create a collection to start organizing items in this workspace."
          />
        </NotebookListShelf>
      </AppScreenShell>
    );
  }

  const showSearchBlank = searchActive && !searchQuery.trim();
  const showSearchEmpty =
    searchActive && Boolean(searchQuery.trim()) && filteredCollections.length === 0;

  return (
    <AppScreenShell
      {...shellProps}
      footer={searchActive ? undefined : newCollectionFooter}
    >
      <View style={styles.content}>
        <NotebookListShelf
          countLabel={collectionCountLabel(listCount)}
          accent="collection"
          framed={false}
          countColor="tertiary"
        >
          {showSearchBlank ? (
            <EmptyListContent
              title="Find a collection"
              description="Start typing to filter collections in this workspace."
            />
          ) : showSearchEmpty ? (
            <EmptyListContent
              title="No matching collections"
              description="Try another name or description."
            />
          ) : (
            <ScrollIndicatorFlatList
              data={filteredCollections}
              keyExtractor={(item) => item.id}
              keyboardShouldPersistTaps="handled"
              refreshing={searchActive ? false : isRefetching}
              onRefresh={searchActive ? undefined : refetch}
              contentContainerStyle={styles.listContent}
              renderItem={({ item, index }) => {
                const meta = `${item.itemCount} ${item.itemCount === 1 ? 'item' : 'items'} · ${formatRelativeTime(item.lastActivityAt)}`;
                return (
                  <SwipeableRow
                    onEdit={() =>
                      navigation.navigate('EditCollection', {
                        workspaceId,
                        workspaceName,
                        collectionId: item.id,
                        collectionName: item.name,
                        collectionDescription: item.description,
                      })
                    }
                    onDelete={() =>
                      confirmDelete(
                        'Delete collection?',
                        `Remove "${item.name}" and all its items?`,
                        () => deleteCollection.mutate(item.id),
                      )
                    }
                  >
                    <NotebookRow
                      title={item.name}
                      description={item.description || undefined}
                      meta={meta}
                      onPress={() =>
                        navigation.navigate('CollectionDetails', {
                          collectionId: item.id,
                          collectionName: item.name,
                          workspaceId,
                        })
                      }
                      showDivider={index < filteredCollections.length - 1}
                      size="collection"
                      pinTarget={{
                        type: 'collection',
                        workspaceId,
                        collectionId: item.id,
                      }}
                    />
                  </SwipeableRow>
                );
              }}
            />
          )}
        </NotebookListShelf>
      </View>
    </AppScreenShell>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    minHeight: 0,
  },
  listContent: {
    flexGrow: 1,
  },
});
