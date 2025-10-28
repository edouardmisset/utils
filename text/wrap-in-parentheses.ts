/**
 * Wraps a number (or string) in parentheses.
 *
 * Given a non empty string or a number greater than zero, returns it as a string
 * wrapped in parentheses. Otherwise, returns an empty string.
 *
 * @param {number | string} textOrNumber - The number (or text) to wrap in parentheses.
 * @returns {string} The number (or string) wrapped in parentheses
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Wraps valid numbers and strings
 * assertEquals(wrapInParentheses(42), '(42)')
 * assertEquals(wrapInParentheses('hello'), '(hello)')
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Returns empty string for invalid inputs
 * assertEquals(wrapInParentheses(0), '')
 * assertEquals(wrapInParentheses(-5), '')
 * assertEquals(wrapInParentheses(''), '')
 * assertEquals(wrapInParentheses('  '), '')
 * ```
 */
export function wrapInParentheses(textOrNumber: number | string): string {
  if (typeof textOrNumber === 'number' && textOrNumber <= 0) {
    return ''
  }
  if (typeof textOrNumber === 'string' && textOrNumber.trim() === '') {
    return ''
  }
  return `(${textOrNumber})`
}
