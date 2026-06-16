import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useCollections, useCreateCollection } from '@/features/collections/hooks/useCollections';
import { AppScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import {
  Button,
  EmptyNotebook,
  IndexFooter,
  Input,
  Screen,
  ScreenMeta,
  SkeletonList,
  Stack,
  Text,
  TextLink,
  useNotebookIndexStyle,
} from '@/shared/ui';
import { getScreenErrorMessage } from '@/utils';
import { CollectionCard } from '../components/CollectionCard';

function collectionCountLabel(count: number) {
  return count === 1 ? '1 section' : `${count} sections`;
}

export function CollectionListScreen({ navigation, route }: AppScreenProps<'CollectionList'>) {
  const { workspaceId, workspaceName } = route.params;
  const { colors, spacing } = useTheme();
  const indexStyle = useNotebookIndexStyle();
  const { data: collections, isLoading, isError, refetch, isRefetching } = useCollections(workspaceId);
  const createCollection = useCreateCollection(workspaceId);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    setError(null);
    if (!name.trim()) return;
    try {
      const collection = await createCollection.mutateAsync({
        name: name.trim(),
        description: description.trim() || undefined,
        icon: '📓',
      });
      setShowCreate(false);
      setName('');
      setDescription('');
      navigation.navigate('CollectionDetails', {
        collectionId: collection.id,
        collectionName: collection.name,
        workspaceId,
      });
    } catch (e) {
      setError(getScreenErrorMessage(e, 'Could not create collection.'));
    }
  };

  const createPanel = showCreate ? (
    <Stack gap="md" style={{ marginBottom: spacing.lg }}>
      <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: colors.border }} />
      <Stack gap="sm">
        <Text variant="sectionTitle">New collection</Text>
        <Input label="Name" value={name} onChangeText={setName} placeholder="Winter Food Storage" />
        <Input
          label="Description (optional)"
          value={description}
          onChangeText={setDescription}
          placeholder="What this section tracks"
        />
        {error ? (
          <Text variant="caption" color="danger">
            {error}
          </Text>
        ) : null}
        <Stack horizontal gap="sm">
          <Button label="Create" onPress={handleCreate} disabled={createCollection.isPending} style={{ flex: 1 }} />
          <Button label="Cancel" variant="ghost" onPress={() => setShowCreate(false)} />
        </Stack>
      </Stack>
    </Stack>
  ) : null;

  const listFooter = !showCreate ? (
    <IndexFooter>
      <TextLink label="New collection" onPress={() => setShowCreate(true)} />
    </IndexFooter>
  ) : null;

  const metaLabel = `${collectionCountLabel(collections?.length ?? 0)} · ${workspaceName}`;

  if (isLoading) {
    return (
      <Screen edges={['bottom']}>
        <ScreenMeta label={metaLabel} />
        <View style={indexStyle}>
          <SkeletonList count={4} />
        </View>
      </Screen>
    );
  }

  if (isError) {
    return (
      <Screen edges={['bottom']}>
        {createPanel}
        <EmptyNotebook
          title="Could not load collections"
          description="Pull to refresh or try again in a moment."
          actionLabel="Retry"
          onAction={() => refetch()}
        />
      </Screen>
    );
  }

  if (!collections?.length) {
    return (
      <Screen edges={['bottom']}>
        <ScreenMeta label={metaLabel} />
        {createPanel}
        {!showCreate ? (
          <EmptyNotebook
            title="This notebook is empty"
            description="Create your first collection to begin organizing information."
            actionLabel="New collection"
            onAction={() => setShowCreate(true)}
          />
        ) : null}
      </Screen>
    );
  }

  return (
    <Screen edges={['bottom']}>
      <ScreenMeta label={metaLabel} />
      {createPanel}

      <FlatList
        style={styles.list}
        data={collections}
        keyExtractor={(item) => item.id}
        refreshing={isRefetching}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContent, indexStyle]}
        ListFooterComponent={listFooter}
        renderItem={({ item, index }) => (
          <CollectionCard
            collection={item}
            onPress={() =>
              navigation.navigate('CollectionDetails', {
                collectionId: item.id,
                collectionName: item.name,
                workspaceId,
              })
            }
            showDivider={index < collections.length - 1}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  listContent: { flexGrow: 1 },
});
