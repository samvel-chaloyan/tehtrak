/** Brief pause so demo mutations feel responsive without blocking the UI. */
export function demoDelay(ms = 120): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
