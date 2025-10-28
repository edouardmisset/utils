/**
 * Checks if the given value is compatible with Date.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} - True if the value is compatible with Date, false otherwise.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // String is compatible
 * assertEquals(isDateCompatible('2023-01-15'), true)
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Date object is compatible
 * assertEquals(isDateCompatible(new Date()), true)
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Number (timestamp) is compatible
 * assertEquals(isDateCompatible(1640000000000), true)
 * // Other types are not compatible
 * assertEquals(isDateCompatible(null), false)
 * assertEquals(isDateCompatible({}), false)
 * ```
 */
export function isDateCompatible(
  value: unknown,
): value is Date | number | string {
  return typeof value === 'string' || value instanceof Date ||
    typeof value === 'number'
}
