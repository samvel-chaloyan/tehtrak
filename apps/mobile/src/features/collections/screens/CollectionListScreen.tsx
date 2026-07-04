import { StyleSheet, View } from 'react-native';

import {
  useDeleteCollection,
  useCollections,
} from '@/features/collections/hooks/useCollections';
import { AppScreenProps } from '@/navigation/types';
import {
  AppScreenShell,
  EmptyListContent,
  NotebookListShelf,
  NotebookRow,
  ScrollIndicatorFlatList,
  SingleBottomButton,
  SkeletonList,
} from '@/shared/ui';
import { confirmDelete } from '@/utils/confirmDelete';
import { formatRelativeTime } from '@/utils';

function collectionCountLabel(count: number) {
  return count === 1 ? '1 collection' : `${count} collections`;
}

export function CollectionListScreen({ navigation, route }: AppScreenProps<'CollectionList'>) {
  const { workspaceId, workspaceName } = route.params;
  const { data: collections, isLoading, isError, refetch, isRefetching } = useCollections(workspaceId);
  const deleteCollection = useDeleteCollection(workspaceId);

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

  const shellProps = {
    navigation,
    title: 'Collections',
    subtitle: workspaceName,
    subtitleUnderline: true,
    onBack: () => navigation.goBack(),
  };

  if (isLoading) {
    return (
      <AppScreenShell {...shellProps}>
        <NotebookListShelf countLabel={collectionCountLabel(0)}>
          <SkeletonList count={4} />
        </NotebookListShelf>
      </AppScreenShell>
    );
  }

  if (isError) {
    return (
      <AppScreenShell {...shellProps} footer={retryFooter}>
        <EmptyListContent
          title="Could not load collections"
          description="Pull to refresh or try again in a moment."
        />
      </AppScreenShell>
    );
  }

  const count = collections?.length ?? 0;

  if (!count) {
    return (
      <AppScreenShell {...shellProps} footer={newCollectionFooter}>
        <NotebookListShelf countLabel={collectionCountLabel(count)}>
          <EmptyListContent
            title="No collections yet"
            description="Create your first collection to begin organizing items."
          />
        </NotebookListShelf>
      </AppScreenShell>
    );
  }

  const collectionList = collections ?? [];

  return (
    <AppScreenShell {...shellProps} footer={newCollectionFooter}>
      <View style={styles.content}>
        <NotebookListShelf countLabel={collectionCountLabel(count)}>
          <ScrollIndicatorFlatList
            data={collectionList}
            keyExtractor={(item) => item.id}
            refreshing={isRefetching}
            onRefresh={refetch}
            contentContainerStyle={styles.listContent}
            renderItem={({ item, index }) => {
              const meta = `${item.itemCount} ${item.itemCount === 1 ? 'item' : 'items'} · ${formatRelativeTime(item.lastActivityAt)}`;
              return (
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
                  showDivider={index < collectionList.length - 1}
                  size="collection"
                />
              );
            }}
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
