export type SheetActionTone = 'default' | 'danger' | 'cancel';

export interface SheetAction {
  label: string;
  onPress: () => void;
  tone?: SheetActionTone;
}

export interface PresentActionsOptions {
  title?: string;
  message?: string;
  actions: SheetAction[];
}

export interface PresentConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Defaults to danger (delete). Use default for discard / neutral confirms. */
  confirmTone?: SheetActionTone;
  onConfirm: () => void;
}

export interface InfoDetailRow {
  label: string;
  value: string;
}

export interface PresentInfoOptions {
  title: string;
  /** Description / primary body. */
  message?: string;
  /** Quiet one-liner (e.g. “3 collections”). */
  meta?: string;
  details?: InfoDetailRow[];
  closeLabel?: string;
}

export interface PresentEditOptions {
  /** Card heading — defaults to “Edit”. */
  title?: string;
  initialName: string;
  initialDescription: string;
  nameLabel?: string;
  descriptionLabel?: string;
  descriptionPlaceholder?: string;
  saveLabel?: string;
  closeLabel?: string;
  onSave: (values: { name: string; description: string }) => Promise<void>;
}

export interface SheetControllerApi {
  presentActions: (options: PresentActionsOptions) => void;
  presentConfirm: (options: PresentConfirmOptions) => void;
  presentInfo: (options: PresentInfoOptions) => void;
  presentEdit: (options: PresentEditOptions) => void;
  dismiss: () => void;
}

let bridge: SheetControllerApi | null = null;

export function registerSheetController(api: SheetControllerApi | null) {
  bridge = api;
}

function requireBridge(): SheetControllerApi {
  if (!bridge) {
    throw new Error('SheetHost is not mounted — wrap the app with <SheetHost>.');
  }
  return bridge;
}

export function presentActions(options: PresentActionsOptions) {
  requireBridge().presentActions(options);
}

export function presentConfirm(options: PresentConfirmOptions) {
  requireBridge().presentConfirm(options);
}

export function presentInfo(options: PresentInfoOptions) {
  requireBridge().presentInfo(options);
}

export function presentEdit(options: PresentEditOptions) {
  requireBridge().presentEdit(options);
}

export function dismissSheet() {
  bridge?.dismiss();
}
