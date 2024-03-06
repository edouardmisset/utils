/**
 * Checks if a string equals a substring in a case-insensitive manner.
 *
 * @param leftString - The left string to search.
 * @param rightString - The right string to search.
 * @returns A boolean indicating whether the string equals the substring.
 */
export function stringEqualsCaseInsensitive(leftString: string,
  rightString: string): boolean {
  return leftString.toLowerCase() === rightString.toLowerCase()
}
