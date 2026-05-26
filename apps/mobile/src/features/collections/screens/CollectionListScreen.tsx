import { useState } from 'react';
import { FlatList } from 'react-native';
import { ApiClientError } from '@/core/api';
import { useCollections, useCreateCollection } from '@/features/collections/hooks/useCollections';
import { AppScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import { Button, EmptyState, Input, Loader, Screen, Stack, Text } from '@/shared/ui';
import { CollectionCard } from '../components/CollectionCard';

export function CollectionListScreen({ navigation, route }: AppScreenProps<'CollectionList'>) {
  const { workspaceId } = route.params;
  const { spacing } = useTheme();
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
      setError(e instanceof ApiClientError ? e.displayMessage : 'Could not create collection.');
    }
  };

  if (isLoading) {
    return <Loader fullScreen message="Loading collections…" />;
  }

  return (
    <Screen edges={['bottom']} padded={false}>
      <Stack style={{ flex: 1, paddingHorizontal: spacing.md, paddingTop: spacing.md }}>
        {showCreate ? (
          <Stack gap="sm" style={{ marginBottom: spacing.md }}>
            <Input label="Collection name" value={name} onChangeText={setName} placeholder="Winter Food Storage" />
            <Input
              label="Description (optional)"
              value={description}
              onChangeText={setDescription}
              placeholder="What this notebook tracks"
            />
            {error ? (
              <Text variant="caption" color="danger">
                {error}
              </Text>
            ) : null}
            <Stack horizontal gap="sm">
              <Button label="Create" onPress={handleCreate} disabled={createCollection.isPending} />
              <Button label="Cancel" variant="ghost" onPress={() => setShowCreate(false)} />
            </Stack>
          </Stack>
        ) : (
          <Button
            label="New collection"
            variant="secondary"
            fullWidth
            onPress={() => setShowCreate(true)}
            style={{ marginBottom: spacing.md }}
          />
        )}

        {isError ? (
          <EmptyState
            title="Could not load collections"
            description="Pull to refresh or try again in a moment."
            actionLabel="Retry"
            onAction={() => refetch()}
          />
        ) : !collections?.length ? (
          <EmptyState
            title="No collections in this workspace"
            description="Collections are the notebooks inside a workspace — winter storage, shift logs, intake registers."
            actionLabel="Create collection"
            onAction={() => setShowCreate(true)}
          />
        ) : (
          <FlatList
            data={collections}
            keyExtractor={(item) => item.id}
            refreshing={isRefetching}
            onRefresh={refetch}
            contentContainerStyle={{ gap: spacing.md, paddingBottom: spacing['2xl'] }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CollectionCard
                collection={item}
                onPress={() =>
                  navigation.navigate('CollectionDetails', {
                    collectionId: item.id,
                    collectionName: item.name,
                    workspaceId,
                  })
                }
              />
            )}
          />
        )}
      </Stack>
    </Screen>
  );
}
