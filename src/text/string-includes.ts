/**
 * Checks if a string includes a substring. The check can be case sensitive or case insensitive.
 *
 * @param {string} string - The string to search in.
 * @param {string} subString - The substring to search for.
 * @param {Object} [options={ caseSensitive: false }] - An optional parameter that specifies whether the search should be case sensitive.
 * @param {boolean} [options.caseSensitive=false] - If true, the search will be case sensitive.
 *
 * @returns {boolean} Returns true if the string includes the substring, false otherwise.
 *
 * @example
 * // returns true
 * stringIncludesCaseInsensitive('Hello World', 'hello')
 *
 * @example
 * // returns false
 * stringIncludesCaseInsensitive('Hello World', 'hello', { caseSensitive: true })
 */
export function stringIncludesCaseInsensitive(
  string: string,
  subString: string,
  { caseSensitive }: { caseSensitive?: boolean } = { caseSensitive: false }
): boolean {
  return caseSensitive
    ? string.includes(subString)
    : string.toLowerCase().includes(subString.toLowerCase())
}

export const stringIncludes = stringIncludesCaseInsensitive
