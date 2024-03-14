/**
 * Capitalizes the first letter of a word (string).
 *
 * **Note:** This function will convert the rest of the string to lowercase.
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
 * capitalize('WORLD HELLO')
 * // returns "World hello"
 * ```
 */
export function capitalize(word: string): string {
  return word
    ? word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase()
    : word
}
