/**
 * Checks if a string includes a substring. The check can be case sensitive or
 * case insensitive.
 *
 * @param {string} string - The string to search in.
 * @param {string} subString - The substring to search for.
 * @param {Object} [options={ caseSensitive: false }] - An optional parameter
 * that specifies whether the search should be case sensitive.
 * @param {boolean} [options.caseSensitive=false] - If true, the search will be
 * case sensitive.
 *
 * @returns {boolean} Returns true if the string includes the substring, false
 * otherwise.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Case-insensitive by default
 * assertEquals(stringIncludes('Hello World', 'hello'), true)
 * assertEquals(stringIncludes('Hello World', 'WORLD'), true)
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Case-sensitive when specified
 * assertEquals(stringIncludes('Hello World', 'hello', { caseSensitive: true }), false)
 * assertEquals(stringIncludes('Hello World', 'Hello', { caseSensitive: true }), true)
 * ```
 */
export function stringIncludes(
  string: string,
  subString: string,
  { caseSensitive }: { caseSensitive?: boolean } = { caseSensitive: false },
): boolean {
  return caseSensitive
    ? string.includes(subString)
    : string.toLowerCase().includes(subString.toLowerCase())
}
