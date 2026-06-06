import { StyleSheet, View } from 'react-native';
import { Card, Stack, Text } from '@/shared/ui';
import { Collection } from '@/types';
import { formatRelativeTime } from '@/utils';

interface CollectionCardProps {
  collection: Collection;
  onPress: () => void;
}

export function CollectionCard({ collection, onPress }: CollectionCardProps) {
  return (
    <Card onPress={onPress}>
      <Stack horizontal align="center" gap="md">
        <View style={styles.emoji}>
          <Text variant="title">{collection.emoji}</Text>
        </View>
        <Stack gap="xs" style={styles.content}>
          <Text variant="subtitle">{collection.name}</Text>
          <Text variant="bodySmall" color="secondary" numberOfLines={2}>
            {collection.description}
          </Text>
          <Text variant="caption" color="tertiary">
            {collection.itemCount} items · {formatRelativeTime(collection.lastActivityAt)}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
}

const styles = StyleSheet.create({
  emoji: {
    width: 40,
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
});
