import { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useFields } from '@/features/properties/hooks/useFields';
import { useRecords } from '@/features/items/hooks/useRecords';
import { AppScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import {
  EmptyNotebook,
  IndexFooter,
  NotebookRow,
  Screen,
  ScreenMeta,
  SkeletonList,
  TextLink,
  useNotebookIndexStyle,
} from '@/shared/ui';
import { getItemSubtitle, getItemTitle } from '@/utils';

export function CollectionDetailsScreen({
  navigation,
  route,
}: AppScreenProps<'CollectionDetails'>) {
  const { collectionId, collectionName, workspaceId } = route.params;
  const { spacing } = useTheme();
  const indexStyle = useNotebookIndexStyle();
  const { data: fields, isLoading: fieldsLoading } = useFields(workspaceId, collectionId);
  const { data: items, isLoading: itemsLoading, isError, refetch, isRefetching } = useRecords(
    workspaceId,
    collectionId,
  );

  const fieldList = fields ?? [];
  const itemList = items ?? [];
  const isLoading = fieldsLoading || itemsLoading;

  const openCreateItem = useCallback(
    () => navigation.navigate('CreateItem', { collectionId, collectionName, workspaceId }),
    [navigation, collectionId, collectionName, workspaceId],
  );

  const openCreateProperty = useCallback(
    () => navigation.navigate('CreateProperty', { collectionId, collectionName, workspaceId }),
    [navigation, collectionId, collectionName, workspaceId],
  );

  const propertyLabel = `${fieldList.length} ${fieldList.length === 1 ? 'property' : 'properties'}`;
  const itemCountLabel = itemList.length === 1 ? '1 page' : `${itemList.length} pages`;
  const metaLabel = itemList.length > 0 ? `${propertyLabel} · ${itemCountLabel}` : propertyLabel;

  const footerActions = (
    <IndexFooter style={{ paddingHorizontal: spacing.lg }}>
      <View style={{ gap: spacing.md }}>
        <TextLink label="Add item" onPress={openCreateItem} />
        <TextLink label="Add property" onPress={openCreateProperty} emphasis={false} />
      </View>
    </IndexFooter>
  );

  return (
    <Screen edges={['bottom']} padded={false} style={styles.screen}>
      <View style={{ paddingHorizontal: spacing.lg }}>
        <ScreenMeta label={metaLabel} />
      </View>

      {isLoading ? (
        <View style={{ paddingHorizontal: spacing.lg }}>
          <View style={indexStyle}>
            <SkeletonList count={5} />
          </View>
        </View>
      ) : isError ? (
        <View style={{ paddingHorizontal: spacing.lg }}>
          <EmptyNotebook
            title="Could not load items"
            description="Pull to refresh or try again in a moment."
            actionLabel="Retry"
            onAction={() => refetch()}
          />
        </View>
      ) : !itemList.length ? (
        <View style={{ paddingHorizontal: spacing.lg }}>
          <EmptyNotebook
            title="No pages yet"
            description="Record your first item in this section."
            actionLabel="Add item"
            onAction={openCreateItem}
          />
          <IndexFooter>
            <TextLink label="Add property" onPress={openCreateProperty} emphasis={false} />
          </IndexFooter>
        </View>
      ) : (
        <FlashList
          style={styles.list}
          data={itemList}
          keyExtractor={(item) => item.id}
          refreshing={isRefetching}
          onRefresh={refetch}
          contentContainerStyle={{
            ...indexStyle,
            marginHorizontal: spacing.lg,
            paddingBottom: spacing.md,
          }}
          ListFooterComponent={footerActions}
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
              showDivider={index < itemList.length - 1}
              size="item"
            />
          )}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  list: { flex: 1 },
});
