/**
 * Checks if a string is valid JSON.
 *
 * @param {string} string_ - The string to check.
 * @returns {boolean} - Returns true if the string is valid JSON, otherwise false.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Valid JSON
 * assertEquals(isValidJSON('{"name":"John", "age":30}'), true)
 * assertEquals(isValidJSON('[]'), true)
 * assertEquals(isValidJSON('""'), true) // empty string as JSON string
 * assertEquals(isValidJSON('123'), true) // number as JSON
 * assertEquals(isValidJSON('true'), true) // boolean as JSON
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Invalid JSON
 * assertEquals(isValidJSON('Invalid JSON string'), false)
 * assertEquals(isValidJSON('{name: "John"}'), false)
 * ```
 */
export function isValidJSON(string_: string): boolean {
  try {
    JSON.parse(string_)
    return true
  } catch (_error) {
    return false
  }
}

/**
 * Alias for the {@link isValidJSON} function.
 */
export const isJSON: typeof isValidJSON = isValidJSON
