import { FlatList } from 'react-native';
import { AppScreenProps } from '@/navigation/types';
import { getAllCollections } from '@/store';
import { useTheme } from '@/theme';
import { EmptyState, Screen, Stack } from '@/shared/ui';
import { CollectionCard } from '../components/CollectionCard';

export function CollectionListScreen({ navigation, route }: AppScreenProps<'CollectionList'>) {
  const { workspaceId } = route.params;
  const { spacing } = useTheme();
  const collections = getAllCollections(workspaceId);

  return (
    <Screen edges={['bottom']} padded={false}>
      <Stack style={{ flex: 1, paddingHorizontal: spacing.md }}>
        {collections.length === 0 ? (
          <EmptyState
            title="No collections in this workspace"
            description="Collections are the notebooks inside a workspace — winter storage, shift logs, intake registers."
          />
        ) : (
          <FlatList
            data={collections}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: spacing.md, paddingVertical: spacing.md }}
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
