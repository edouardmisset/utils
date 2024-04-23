/**
 * Checks if a string equals another string in a case-insensitive manner.
 * **Note**: uses the `normalize` method to normalize the strings to Unicode
 * Normalization Form Composition (NFC)
 * {@link [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize#description)}
 *
 * @param {string} leftString - The first string to compare.
 * @param {string} rightString - The second string to compare.
 * @returns {boolean} - A boolean indicating whether the two strings are equal,
 * ignoring case.
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
  return leftString.normalize('NFC').toLowerCase() ===
    rightString.normalize('NFC').toLowerCase()
}

/**
 * Checks if a string equals another string.
 *
 * By default, this function compares the strings in a case-insensitive manner.
 *
 * **Note**: uses the `normalize` method to normalize the strings to Unicode Normalization
 * Form Composition (NFC)
 * {@link [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize#description)}
 *
 * @param {string} leftString - The first string to compare.
 * @param {string} rightString - The second string to compare.
 * @param {object} options - An options object.
 * @param {boolean} [options.caseSensitive] - A boolean indicating whether to
 * compare the strings in a case-sensitive manner. Defaults to `false`.
 * @returns {boolean} - A boolean indicating whether the two strings are equal.
 *
 * @example
 * ```typescript
 * stringEquals('Hello', 'hello', { caseSensitive: false })
 * // returns true
 * ```
 *
 * @example
 * ```typescript
 * stringEquals('Hello', 'hello', { caseSensitive: true })
 * // returns false
 * ```
 */
export function stringEquals(
  leftString: string,
  rightString: string,
  { caseSensitive }: { caseSensitive?: boolean } = { caseSensitive: false },
): boolean {
  return caseSensitive
    ? leftString.normalize('NFC') === rightString.normalize('NFC')
    : stringEqualsCaseInsensitive(leftString, rightString)
}
