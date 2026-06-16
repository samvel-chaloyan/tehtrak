import { NotebookRow } from '@/shared/ui';
import { Collection } from '@/types';
import { formatRelativeTime } from '@/utils';

interface CollectionCardProps {
  collection: Collection;
  onPress: () => void;
  showDivider?: boolean;
}

export function CollectionCard({ collection, onPress, showDivider }: CollectionCardProps) {
  const meta = `${collection.itemCount} ${collection.itemCount === 1 ? 'item' : 'items'} · ${formatRelativeTime(collection.lastActivityAt)}`;

  return (
    <NotebookRow
      title={collection.name}
      description={collection.description || undefined}
      meta={meta}
      onPress={onPress}
      showDivider={showDivider}
      size="collection"
    />
  );
}
