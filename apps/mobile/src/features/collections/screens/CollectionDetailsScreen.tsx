import { Pressable, StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { AppScreenProps } from '@/navigation/types';
import { getAllFields, getAllItems } from '@/store';
import { useTheme } from '@/theme';
import { Button, Card, EmptyState, Screen, Stack, Text } from '@/shared/ui';
import { getItemSubtitle, getItemTitle } from '@/utils';

export function CollectionDetailsScreen({
  navigation,
  route,
}: AppScreenProps<'CollectionDetails'>) {
  const { collectionId, collectionName } = route.params;
  const { spacing } = useTheme();
  const fields = getAllFields(collectionId);
  const items = getAllItems(collectionId);

  return (
    <Screen edges={['bottom']} padded={false} style={styles.screen}>
      <View style={[styles.toolbar, { paddingHorizontal: spacing.md, paddingBottom: spacing.sm }]}>
        <Stack horizontal gap="sm">
          <Button
            label="New entry"
            size="md"
            onPress={() => navigation.navigate('CreateItem', { collectionId, collectionName })}
            style={styles.flex}
          />
          <Button
            label="Property"
            variant="secondary"
            onPress={() => navigation.navigate('CreateProperty', { collectionId, collectionName })}
          />
        </Stack>
        <Text variant="caption" color="tertiary" style={{ marginTop: spacing.sm }}>
          {fields.length} properties · metadata-driven forms
        </Text>
      </View>

      {items.length === 0 ? (
        <View style={{ paddingHorizontal: spacing.md }}>
          <EmptyState
            title="This notebook is empty"
            description="Add your first operational entry — a jar on the cellar shelf, a vehicle at the gate, a pallet on the floor."
            actionLabel="Add first entry"
            onAction={() => navigation.navigate('CreateItem', { collectionId, collectionName })}
          />
        </View>
      ) : (
        <FlashList
          style={styles.list}
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: spacing.md, paddingBottom: spacing['2xl'] }}
          ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
          renderItem={({ item }) => (
            <Card
              onPress={() =>
                navigation.navigate('ItemDetails', {
                  itemId: item.id,
                  collectionId,
                  collectionName,
                })
              }
            >
              <Stack gap="xs">
                <Text variant="subtitle">{getItemTitle(item, fields)}</Text>
                {getItemSubtitle(item, fields) ? (
                  <Text variant="bodySmall" color="secondary">
                    {getItemSubtitle(item, fields)}
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
