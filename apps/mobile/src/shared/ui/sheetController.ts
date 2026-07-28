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
  onConfirm: () => void;
}

export interface SheetControllerApi {
  presentActions: (options: PresentActionsOptions) => void;
  presentConfirm: (options: PresentConfirmOptions) => void;
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

export function dismissSheet() {
  bridge?.dismiss();
}
