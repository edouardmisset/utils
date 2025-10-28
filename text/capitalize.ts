/**
 * Capitalizes the first letter of a word (string).
 *
 * **Note:** By default, this function will convert the rest of the string to
 * lowercase. This behavior can be controlled with the `lowercase` option.
 *
 * @param {string} word - The word to capitalize.
 * @param {object} [options] - Optional configuration object.
 * @param {boolean} [options.lowercase=true] - Whether to convert the rest of
 * the string to lowercase.
 *
 * @returns {string} - The word with the first letter capitalized.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Basic capitalization
 * assertEquals(capitalize('hello'), 'Hello')
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // With lowercase conversion (default)
 * assertEquals(capitalize('WORLD HELLO'), 'World hello')
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Without lowercase conversion
 * assertEquals(capitalize('WORLD HELLO', { lowercase: false }), 'WORLD HELLO')
 * assertEquals(capitalize('hELLO wORLD', { lowercase: false }), 'HELLO wORLD')
 * ```
 */
export function capitalize(
  word: string,
  options?: { lowercase?: boolean },
): string {
  const { lowercase = true } = options ?? {}

  if (!word) return word

  return word.charAt(0).toLocaleUpperCase() +
    (lowercase ? word.slice(1).toLocaleLowerCase() : word.slice(1))
}
