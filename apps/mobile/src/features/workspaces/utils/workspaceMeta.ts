import type { WorkspaceSummary } from '@/types';

export function collectionCountLabel(count: number) {
  return count === 1 ? '1 collection' : `${count} collections`;
}

export function formatWorkspaceUpdated(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round(
    (startOfToday.getTime() - startOfDate.getTime()) / 86400000,
  );

  if (diffDays === 0) {
    return 'Updated today';
  }
  if (diffDays === 1) {
    return 'Updated yesterday';
  }
  if (diffDays < 7) {
    return `Updated ${diffDays} days ago`;
  }

  return `Updated ${date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })}`;
}

export function workspaceCardMetaLines(summary?: WorkspaceSummary) {
  if (!summary) {
    return [''];
  }

  const lines = [collectionCountLabel(summary.collectionCount)];
  if (summary.lastActivityAt) {
    lines.push(formatWorkspaceUpdated(summary.lastActivityAt));
  }
  return lines;
}
