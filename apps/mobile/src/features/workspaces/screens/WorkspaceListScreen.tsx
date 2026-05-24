import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { AppScreenProps } from '@/navigation/types';
import { getAllWorkspaces, useAppStore } from '@/store';
import { useTheme } from '@/theme';
import { EmptyState, Screen, Stack, Text } from '@/shared/ui';
import { WorkspaceCard } from '../components/WorkspaceCard';

export function WorkspaceListScreen({ navigation }: AppScreenProps<'WorkspaceList'>) {
  const { spacing, colors } = useTheme();
  const workspaces = getAllWorkspaces();
  const selectedWorkspaceId = useAppStore((s) => s.selectedWorkspaceId);
  const selectWorkspace = useAppStore((s) => s.selectWorkspace);
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);

  const openWorkspace = (workspaceId: string, workspaceName: string) => {
    selectWorkspace(workspaceId);
    navigation.navigate('CollectionList', { workspaceId, workspaceName });
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <View style={[styles.header, { paddingTop: spacing.md, paddingBottom: spacing.lg }]}>
        <Stack gap="xs">
          <Text variant="titleLarge">Your workspaces</Text>
          <Text variant="body" color="secondary">
            Each workspace is a separate operational notebook.
          </Text>
        </Stack>
        <Pressable onPress={() => setAuthenticated(false)} hitSlop={12}>
          <Text variant="caption" color="tertiary">
            Sign out
          </Text>
        </Pressable>
      </View>

      {workspaces.length === 0 ? (
        <EmptyState
          title="No workspaces yet"
          description="When you create a workspace, your collections and daily notes will live here — calm and organized."
          actionLabel="Create workspace"
          onAction={() => {}}
        />
      ) : (
        <FlatList
          data={workspaces}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: spacing.md, paddingBottom: spacing['2xl'] }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <WorkspaceCard
              workspace={item}
              selected={item.id === selectedWorkspaceId}
              onPress={() => openWorkspace(item.id, item.name)}
            />
          )}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});
