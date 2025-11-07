/**
 * Removes diacritics (accents) from a string.
 *
 * The function uses the "Normalization Form Decomposition" (NFD)
 * {@link [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize#description)}
 * to decompose the string into base characters and combining characters
 * (accents). It then removes the accents by replacing them with an empty string.
 *
 * The regular expression /[\u0300-\u036f]/g matches any character in the
 * Unicode range from 0300 to 036F, which includes many common diacritical
 * marks.
 *
 * @param {string} string_ - The string from which to remove accents.
 * @returns {string} The string with accents removed.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Removes French accents
 * assertEquals(removeAccents('résumé'), 'resume')
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Removes various diacritics
 * assertEquals(removeAccents('café'), 'cafe')
 * assertEquals(removeAccents('naïve'), 'naive')
 * ```
 */
export function removeAccents(string_: string): string {
  return string_.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
