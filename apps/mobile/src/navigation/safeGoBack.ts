type GoBackNavigation = {
  canGoBack: () => boolean;
  goBack: () => void;
};

/** Avoid React Navigation's "GO_BACK was not handled" on root screens. */
export function safeGoBack(navigation: GoBackNavigation, fallback?: () => void) {
  if (navigation.canGoBack()) {
    navigation.goBack();
    return;
  }
  fallback?.();
}
