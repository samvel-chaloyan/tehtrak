import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useFields } from '@/features/properties/hooks/useFields';
import { useRecords } from '@/features/items/hooks/useRecords';
import { AppScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import { Button, Card, EmptyNotebook, Screen, SkeletonList, Stack, Text } from '@/shared/ui';
import { getItemSubtitle, getItemTitle } from '@/utils';
import { StyleSheet } from 'react-native';

export function CollectionDetailsScreen({
  navigation,
  route,
}: AppScreenProps<'CollectionDetails'>) {
  const { collectionId, collectionName, workspaceId } = route.params;
  const { colors, spacing } = useTheme();
  const { data: fields, isLoading: fieldsLoading } = useFields(workspaceId, collectionId);
  const { data: items, isLoading: itemsLoading, isError, refetch, isRefetching } = useRecords(
    workspaceId,
    collectionId,
  );

  const fieldList = fields ?? [];
  const isLoading = fieldsLoading || itemsLoading;

  return (
    <Screen edges={['bottom']} padded={false} style={styles.screen}>
      <View
        style={[
          styles.toolbar,
          {
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.md,
            paddingBottom: spacing.md,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <Stack gap="sm">
          <Button
            label="Add item"
            fullWidth
            onPress={() =>
              navigation.navigate('CreateItem', { collectionId, collectionName, workspaceId })
            }
          />
          <Button
            label="Add property"
            variant="ghost"
            onPress={() =>
              navigation.navigate('CreateProperty', { collectionId, collectionName, workspaceId })
            }
          />
        </Stack>
        <Text variant="caption" color="secondary" style={{ marginTop: spacing.sm }}>
          {fieldList.length} {fieldList.length === 1 ? 'property' : 'properties'}
        </Text>
      </View>

      {isLoading ? (
        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md }}>
          <SkeletonList count={5} />
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
      ) : !items?.length ? (
        <View style={{ paddingHorizontal: spacing.lg }}>
          <EmptyNotebook
            title="No items yet"
            description="Start recording your first item in this collection."
            actionLabel="Add item"
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
          contentContainerStyle={{
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.md,
            paddingBottom: spacing['2xl'],
          }}
          ItemSeparatorComponent={() => <View style={{ height: spacing.list }} />}
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
  },
});
