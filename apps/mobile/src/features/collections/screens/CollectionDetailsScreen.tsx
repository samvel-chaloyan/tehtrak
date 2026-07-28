import { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { collectionDetailsMeta } from '@/features/collections/constants/starterFields';
import { useFields } from '@/features/properties/hooks/useFields';
import { useDeleteRecord, useRecords } from '@/features/items/hooks/useRecords';
import { AppScreenProps } from '@/navigation/types';
import {
  AppScreenShell,
  EmptyListContent,
  NotebookListShelf,
  NotebookRow,
  OutlineButton,
  ScrollIndicatorFlatList,
  SingleBottomButton,
  SkeletonList,
  SwipeableRow,
} from '@/shared/ui';
import type { Item, PropertyField } from '@/types';
import { confirmDelete } from '@/utils/confirmDelete';
import { getItemSubtitle, getItemTitle } from '@/utils';

function matchesItemQuery(item: Item, fields: PropertyField[], query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return false;
  }

  const title = getItemTitle(item, fields).toLowerCase();
  const subtitle = (getItemSubtitle(item, fields) ?? '').toLowerCase();
  if (title.includes(normalized) || subtitle.includes(normalized)) {
    return true;
  }

  return fields.some((field) => {
    const raw = item.data[field.key];
    if (raw == null || raw === '') {
      return false;
    }
    return String(raw).toLowerCase().includes(normalized);
  });
}

export function CollectionDetailsScreen({
  navigation,
  route,
}: AppScreenProps<'CollectionDetails'>) {
  const { collectionId, collectionName, workspaceId } = route.params;
  const { data: fields, isLoading: fieldsLoading } = useFields(workspaceId, collectionId);
  const { data: items, isLoading: itemsLoading, isError, refetch, isRefetching } = useRecords(
    workspaceId,
    collectionId,
  );
  const deleteRecord = useDeleteRecord(workspaceId, collectionId);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fieldList = fields ?? [];
  const isLoading = fieldsLoading || itemsLoading;

  const enterSearch = useCallback(() => {
    setSearchQuery('');
    setSearchActive(true);
  }, []);

  const exitSearch = useCallback(() => {
    setSearchActive(false);
    setSearchQuery('');
  }, []);

  const openCreateItem = useCallback(
    () => navigation.navigate('CreateItem', { collectionId, collectionName, workspaceId }),
    [navigation, collectionId, collectionName, workspaceId],
  );

  const openCustomizeFields = useCallback(
    () => navigation.navigate('CustomizeFields', { collectionId, collectionName, workspaceId }),
    [navigation, collectionId, collectionName, workspaceId],
  );

  const itemList = items ?? [];

  const filteredItems = useMemo(() => {
    if (!searchActive) {
      return itemList;
    }
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      return [];
    }
    return itemList.filter((item) => matchesItemQuery(item, fieldList, trimmed));
  }, [itemList, fieldList, searchActive, searchQuery]);

  const searchShellProps = {
    searchActive,
    searchQuery,
    searchPlaceholder: 'Find an item',
    onSearchQueryChange: setSearchQuery,
    onSearchCancel: exitSearch,
  };

  const shellProps = {
    navigation,
    title: 'Items',
    subtitle: collectionName,
    subtitleUnderline: true,
    onBack: () => navigation.goBack(),
    onSearch: enterSearch,
    ...searchShellProps,
  };

  const itemFooter = (
    <SingleBottomButton
      action={{
        label: 'Add item',
        icon: 'add-outline',
        onPress: openCreateItem,
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

  const shelfFooter = (
    <OutlineButton label="Customize" compact onPress={openCustomizeFields} />
  );

  if (isLoading) {
    return (
      <AppScreenShell {...shellProps}>
        <NotebookListShelf countLabel={collectionDetailsMeta(0, 0)} footerLeft={shelfFooter} framed={false} countColor="tertiary">
          <SkeletonList count={5} />
        </NotebookListShelf>
      </AppScreenShell>
    );
  }

  if (isError) {
    return (
      <AppScreenShell {...shellProps} footer={retryFooter}>
        <NotebookListShelf
          countLabel={collectionDetailsMeta(0, fieldList.length)}
          framed={false}
          countColor="tertiary"
        >
          <EmptyListContent
            title="Could not load items"
            description="Pull to refresh or try again in a moment."
          />
        </NotebookListShelf>
      </AppScreenShell>
    );
  }

  const itemCount = itemList.length;
  const fieldCount = fieldList.length;
  const listCount = searchActive ? filteredItems.length : itemCount;
  const countLabel = collectionDetailsMeta(listCount, fieldCount);

  if (!itemCount) {
    return (
      <AppScreenShell {...shellProps} footer={itemFooter}>
        <NotebookListShelf countLabel={countLabel} footerLeft={shelfFooter} framed={false} countColor="tertiary">
          <EmptyListContent
            title="No items yet"
            description="Add your first item to begin recording information in this collection."
          />
        </NotebookListShelf>
      </AppScreenShell>
    );
  }

  const showSearchBlank = searchActive && !searchQuery.trim();
  const showSearchEmpty =
    searchActive && Boolean(searchQuery.trim()) && filteredItems.length === 0;

  return (
    <AppScreenShell
      {...shellProps}
      footer={searchActive ? undefined : itemFooter}
    >
      <View style={styles.content}>
        <NotebookListShelf
          countLabel={countLabel}
          footerLeft={searchActive ? undefined : shelfFooter}
          framed={false}
          countColor="tertiary"
        >
          {showSearchBlank ? (
            <EmptyListContent
              title="Find an item"
              description="Start typing to filter items in this collection."
            />
          ) : showSearchEmpty ? (
            <EmptyListContent
              title="No matching items"
              description="Try another title or value."
            />
          ) : (
            <ScrollIndicatorFlatList
              data={filteredItems}
              keyExtractor={(item) => item.id}
              keyboardShouldPersistTaps="handled"
              refreshing={searchActive ? false : isRefetching}
              onRefresh={searchActive ? undefined : refetch}
              contentContainerStyle={styles.listContent}
              renderItem={({ item, index }) => (
                <SwipeableRow
                  onEdit={() =>
                    navigation.navigate('ItemDetails', {
                      itemId: item.id,
                      collectionId,
                      collectionName,
                      workspaceId,
                      edit: true,
                    })
                  }
                  onDelete={() =>
                    confirmDelete('Delete item?', 'This cannot be undone.', () =>
                      deleteRecord.mutate(item.id),
                    )
                  }
                >
                  <NotebookRow
                    title={getItemTitle(item, fieldList)}
                    description={getItemSubtitle(item, fieldList)}
                    onPress={() =>
                      navigation.navigate('ItemDetails', {
                        itemId: item.id,
                        collectionId,
                        collectionName,
                        workspaceId,
                      })
                    }
                    showDivider={index < filteredItems.length - 1}
                    size="item"
                  />
                </SwipeableRow>
              )}
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
