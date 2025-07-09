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
 * capitalize('hello')
 * // returns "Hello"
 * ```
 *
 * @example
 * ```typescript
 * capitalize('WORLD HELLO')
 * // returns "World hello"
 * ```
 *
 * @example
 * ```typescript
 * capitalize('WORLD HELLO', { lowercase: false })
 * // returns "WORLD HELLO"
 * ```
 *
 * @example
 * ```typescript
 * capitalize('hELLO wORLD', { lowercase: false })
 * // returns "HELLO wORLD"
 * ```
 */
export function capitalize(word: string, options?: { lowercase?: boolean }): string {
  const { lowercase = true } = options ?? {}

  if (!word) return word

  return word.charAt(0).toLocaleUpperCase() + (lowercase ? word.slice(1).toLocaleLowerCase() : word.slice(1))
}
