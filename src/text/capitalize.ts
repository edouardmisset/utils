/**
 * Capitalizes the first letter of a word (string).
 *
 * @param {string} word - The word to capitalize.
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
 * capitalize('WORLD')
 * // returns "World"
 * ```
 */
export function capitalize(word: string): string {
  return word
    ? word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase()
    : word
}
