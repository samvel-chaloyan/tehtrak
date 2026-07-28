import {
  CONTEXT_BANNER_HEIGHT,
  ContextBanner,
  type ContextBannerProps,
} from './ContextBanner';

/** @deprecated Prefer ContextBanner / CONTEXT_BANNER_HEIGHT. */
export const INFORMATION_STRIP_HEIGHT = CONTEXT_BANNER_HEIGHT;

export type InformationStripProps = ContextBannerProps;

/** @deprecated Prefer ContextBanner. */
export function InformationStrip(props: InformationStripProps) {
  return <ContextBanner {...props} />;
}
