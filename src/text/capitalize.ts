/**
 * Capitalizes the first letter of a word (string).
 * @param {string} word - The word to capitalize.
 * @returns {string} - The word with the first letter capitalized.
 */
export function capitalize(word: string): string {
  return word
    ? word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase()
    : word
}
