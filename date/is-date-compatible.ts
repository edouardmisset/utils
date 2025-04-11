/**
 * Checks if the given value is compatible with Date.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} - True if the value is compatible with Date, false otherwise.
 */
export function isDateCompatible(
  value: unknown,
): value is Date | number | string {
  return typeof value === 'string' || value instanceof Date ||
    typeof value === 'number'
}
