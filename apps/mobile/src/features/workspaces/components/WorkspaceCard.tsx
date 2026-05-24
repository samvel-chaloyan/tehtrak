import { StyleSheet, View } from 'react-native';
import { Card, Stack, Text } from '@/shared/ui';
import { Workspace } from '@/types';

interface WorkspaceCardProps {
  workspace: Workspace;
  selected?: boolean;
  onPress: () => void;
}

export function WorkspaceCard({ workspace, selected, onPress }: WorkspaceCardProps) {
  return (
    <Card onPress={onPress} elevated={selected}>
      <Stack horizontal align="center" gap="md">
        <View style={styles.emoji}>
          <Text variant="title">{workspace.emoji}</Text>
        </View>
        <Stack gap="xs" style={styles.content}>
          <Text variant="subtitle">{workspace.name}</Text>
          <Text variant="bodySmall" color="secondary" numberOfLines={2}>
            {workspace.description}
          </Text>
          {selected ? (
            <Text variant="caption" color="accent">
              Active workspace
            </Text>
          ) : null}
        </Stack>
      </Stack>
    </Card>
  );
}

const styles = StyleSheet.create({
  emoji: {
    width: 44,
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
});
