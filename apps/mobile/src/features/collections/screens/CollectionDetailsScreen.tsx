import { useCallback } from 'react';
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
} from '@/shared/ui';
import { confirmDelete } from '@/utils/confirmDelete';
import { getItemSubtitle, getItemTitle } from '@/utils';

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

  const fieldList = fields ?? [];
  const isLoading = fieldsLoading || itemsLoading;

  const openCreateItem = useCallback(
    () => navigation.navigate('CreateItem', { collectionId, collectionName, workspaceId }),
    [navigation, collectionId, collectionName, workspaceId],
  );

  const openCustomizeFields = useCallback(
    () => navigation.navigate('CustomizeFields', { collectionId, collectionName, workspaceId }),
    [navigation, collectionId, collectionName, workspaceId],
  );

  const shellProps = {
    navigation,
    title: 'Items',
    subtitle: collectionName,
    subtitleUnderline: true,
    onBack: () => navigation.goBack(),
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
    <OutlineButton label="Customize fields" compact onPress={openCustomizeFields} />
  );

  if (isLoading) {
    return (
      <AppScreenShell {...shellProps}>
        <NotebookListShelf countLabel={collectionDetailsMeta(0, 0)} footerLeft={shelfFooter}>
          <SkeletonList count={5} />
        </NotebookListShelf>
      </AppScreenShell>
    );
  }

  if (isError) {
    return (
      <AppScreenShell {...shellProps} footer={retryFooter}>
        <EmptyListContent
          title="Could not load items"
          description="Pull to refresh or try again in a moment."
        />
      </AppScreenShell>
    );
  }

  const itemList = items ?? [];
  const itemCount = itemList.length;
  const fieldCount = fieldList.length;
  const countLabel = collectionDetailsMeta(itemCount, fieldCount);

  if (!itemCount) {
    return (
      <AppScreenShell {...shellProps} footer={itemFooter}>
        <NotebookListShelf countLabel={countLabel} footerLeft={shelfFooter}>
          <EmptyListContent
            title="No items yet"
            description="Add your first item to begin recording information in this collection."
          />
        </NotebookListShelf>
      </AppScreenShell>
    );
  }

  return (
    <AppScreenShell {...shellProps} footer={itemFooter}>
      <View style={styles.content}>
        <NotebookListShelf countLabel={countLabel} footerLeft={shelfFooter}>
          <ScrollIndicatorFlatList
            data={itemList}
            keyExtractor={(item) => item.id}
            refreshing={isRefetching}
            onRefresh={refetch}
            contentContainerStyle={styles.listContent}
            renderItem={({ item, index }) => (
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
                showDivider={index < itemList.length - 1}
                size="item"
              />
            )}
          />
        </NotebookListShelf>
      </View>
    </AppScreenShell>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
});
