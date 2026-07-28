import { presentConfirm } from '@/shared/ui/sheetController';

export function confirmDelete(title: string, message: string, onConfirm: () => void) {
  presentConfirm({
    title,
    message,
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    onConfirm,
  });
}
