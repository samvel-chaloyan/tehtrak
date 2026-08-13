/** Up to two letters for avatars and Quick Access chips. */
export function displayInitials(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length >= 2) {
    const first = parts[0]?.[0] ?? '';
    const second = parts[1]?.[0] ?? '';
    return `${first}${second}`.toUpperCase();
  }

  const word = parts[0] ?? '?';
  return word.slice(0, 2).toUpperCase();
}
