import { CONTEXT_BANNER_HEIGHT, ContextBanner } from './ContextBanner';

/** @deprecated Prefer ContextBanner — kept for existing imports. */
export const CONTEXT_BAR_SLOT_HEIGHT = CONTEXT_BANNER_HEIGHT;

export type ScreenContextBarProps = {
  onBack?: () => void;
  subtitle?: string;
};

/** @deprecated Prefer ContextBanner. */
export function ScreenContextBar({ onBack, subtitle }: ScreenContextBarProps) {
  return <ContextBanner onBack={onBack} contextLabel={subtitle} />;
}
