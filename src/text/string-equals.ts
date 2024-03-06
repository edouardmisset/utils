/**
 * Checks if a string equals another string in a case-insensitive manner.
 *
 * @param {string} leftString - The first string to compare.
 * @param {string} rightString - The second string to compare.
 * @returns {boolean} - A boolean indicating whether the two strings are equal, ignoring case.
 *
 * @example
 * ```typescript
 * stringEqualsCaseInsensitive('Hello', 'hello')
 * // returns true
 * ```
 *
 * @example
 * ```typescript
 * stringEqualsCaseInsensitive('Hello', 'world')
 * // returns false
 * ```
 */
export function stringEqualsCaseInsensitive(
  leftString: string,
  rightString: string,
): boolean {
  return leftString.toLowerCase() === rightString.toLowerCase()
}
