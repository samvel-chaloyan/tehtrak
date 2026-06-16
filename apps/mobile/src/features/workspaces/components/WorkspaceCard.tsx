import { NotebookRow } from '@/shared/ui';
import { Workspace } from '@/types';

interface WorkspaceCardProps {
  workspace: Workspace;
  selected?: boolean;
  onPress: () => void;
  showDivider?: boolean;
}

export function WorkspaceCard({ workspace, selected, onPress, showDivider }: WorkspaceCardProps) {
  return (
    <NotebookRow
      title={workspace.name}
      description={workspace.description}
      meta={selected ? 'Active notebook' : undefined}
      onPress={onPress}
      showDivider={showDivider}
      size="workspace"
    />
  );
}
