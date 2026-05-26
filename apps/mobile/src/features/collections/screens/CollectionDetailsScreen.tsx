import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useFields } from '@/features/properties/hooks/useFields';
import { useRecords } from '@/features/items/hooks/useRecords';
import { AppScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import { Button, Card, EmptyState, Loader, Screen, Stack, Text } from '@/shared/ui';
import { getItemSubtitle, getItemTitle } from '@/utils';
import { StyleSheet } from 'react-native';

export function CollectionDetailsScreen({
  navigation,
  route,
}: AppScreenProps<'CollectionDetails'>) {
  const { collectionId, collectionName, workspaceId } = route.params;
  const { spacing } = useTheme();
  const { data: fields, isLoading: fieldsLoading } = useFields(workspaceId, collectionId);
  const { data: items, isLoading: itemsLoading, isError, refetch, isRefetching } = useRecords(
    workspaceId,
    collectionId,
  );

  if (fieldsLoading || itemsLoading) {
    return <Loader fullScreen message="Loading entries…" />;
  }

  const fieldList = fields ?? [];

  return (
    <Screen edges={['bottom']} padded={false} style={styles.screen}>
      <View style={[styles.toolbar, { paddingHorizontal: spacing.md, paddingBottom: spacing.sm }]}>
        <Stack horizontal gap="sm">
          <Button
            label="New entry"
            size="md"
            onPress={() => navigation.navigate('CreateItem', { collectionId, collectionName, workspaceId })}
            style={styles.flex}
          />
          <Button
            label="Property"
            variant="secondary"
            onPress={() =>
              navigation.navigate('CreateProperty', { collectionId, collectionName, workspaceId })
            }
          />
        </Stack>
        <Text variant="caption" color="tertiary" style={{ marginTop: spacing.sm }}>
          {fieldList.length} properties · metadata-driven forms
        </Text>
      </View>

      {isError ? (
        <View style={{ paddingHorizontal: spacing.md }}>
          <EmptyState
            title="Could not load entries"
            description="Check your connection and try again."
            actionLabel="Retry"
            onAction={() => refetch()}
          />
        </View>
      ) : !items?.length ? (
        <View style={{ paddingHorizontal: spacing.md }}>
          <EmptyState
            title="This notebook is empty"
            description="Add your first operational entry — a jar on the cellar shelf, a vehicle at the gate, a pallet on the floor."
            actionLabel="Add first entry"
            onAction={() =>
              navigation.navigate('CreateItem', { collectionId, collectionName, workspaceId })
            }
          />
        </View>
      ) : (
        <FlashList
          style={styles.list}
          data={items}
          keyExtractor={(item) => item.id}
          refreshing={isRefetching}
          onRefresh={refetch}
          contentContainerStyle={{ paddingHorizontal: spacing.md, paddingBottom: spacing['2xl'] }}
          ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
          renderItem={({ item }) => (
            <Card
              onPress={() =>
                navigation.navigate('ItemDetails', {
                  itemId: item.id,
                  collectionId,
                  collectionName,
                  workspaceId,
                })
              }
            >
              <Stack gap="xs">
                <Text variant="subtitle">{getItemTitle(item, fieldList)}</Text>
                {getItemSubtitle(item, fieldList) ? (
                  <Text variant="bodySmall" color="secondary">
                    {getItemSubtitle(item, fieldList)}
                  </Text>
                ) : null}
              </Stack>
            </Card>
          )}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  toolbar: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E8ECEF',
  },
  flex: {
    flex: 1,
  },
});
