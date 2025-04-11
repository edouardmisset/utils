/**
 * Wraps a number (or string) in parentheses.
 *
 * Given a non empty string or a number greater than zero, returns it as a string
 * wrapped in parentheses. Otherwise, returns an empty string.
 *
 * @param {number | string} text - The number (or text) to wrap in parentheses.
 * @returns {string} The number (or string) wrapped in parentheses
 */
export function wrapInParentheses(text: number | string): string {
  if (typeof text === 'number' && text <= 0) {
    return ''
  }
  if (typeof text === 'string' && text.trim() === '') {
    return ''
  }
  return `(${text})`
}
