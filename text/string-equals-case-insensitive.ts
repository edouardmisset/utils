/**
 * Checks if a string equals another string in a case-insensitive manner.
 * Uses NFC normalization before comparison.
 */
export function stringEqualsCaseInsensitive(
  leftString: string,
  rightString: string,
): boolean {
  return leftString.normalize('NFC').toLowerCase() ===
    rightString.normalize('NFC').toLowerCase()
}
