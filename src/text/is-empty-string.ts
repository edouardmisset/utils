/**
 * Checks if a string is either empty (""), `null`, or `undefined`.
 *
 * **Note**: Spaces or blanc strings (" ") are considered empty.
 *
 * @param {undefined | null | string} s - The string to be checked.
 * @returns {boolean} - A boolean value indicating whether the string is empty, `null`, or `undefined`.
 *
 * @example
 * ```typescript
 * isEmptyStringOrNullish(null)
 * // returns true
 * ```
 *
 * @example
 * ```typescript
 * isEmptyStringOrNullish(' ')
 * // returns true
 * ```
 *
 * @example
 * ```typescript
 * isEmptyStringOrNullish('hello')
 * // returns false
 * ```
 */
export function isEmptyStringOrNullish(s: undefined | null | string): boolean {
  return s === null || s === undefined || s.trim() === ''
}
