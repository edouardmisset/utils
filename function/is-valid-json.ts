import { tryCatch } from './try-catch.ts'

/**
 * Checks if a string is valid JSON.
 *
 * @param {string} string_ - The string to check.
 * @returns {boolean} - Returns true if the string is valid JSON, otherwise false.
 *
 * @example
 * ```typescript
 * isValidJSON('{"name":"John", "age":30, "city":"New York"}')
 * // returns true
 * isValidJSON('Invalid JSON string')
 * // returns false
 * isValidJSON('')
 * // returns true
 * ```
 */
export function isValidJSON(string_: string): boolean {
  const result = tryCatch(() => JSON.parse(string_))
  return result.error === undefined
}

/**
 * Alias for the {@link isValidJSON} function.
 */
export const isJSON: typeof isValidJSON = isValidJSON
