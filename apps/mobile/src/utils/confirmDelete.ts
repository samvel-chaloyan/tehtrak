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

/** Leave edit mode without saving — used before search or navigation. */
export function confirmDiscardEdits(onConfirm: () => void) {
  presentConfirm({
    title: 'Discard edits?',
    message: 'Your changes on this page will be lost.',
    confirmLabel: 'Discard',
    cancelLabel: 'Keep editing',
    confirmTone: 'default',
    onConfirm,
  });
}
