/**
 * Checks if the given dates are valid.
 *
 * @param {...unknown[]} dates - The dates to check.
 * @returns {boolean} - True if all dates are valid, false otherwise.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Valid date
 * assertEquals(isValidDate(new Date('2023-01-15')), true)
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Invalid date
 * assertEquals(isValidDate(new Date('invalid')), false)
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Multiple dates - all must be valid
 * assertEquals(
 *   isValidDate(new Date('2023-01-15'), new Date('2024-02-20')),
 *   true
 * )
 * assertEquals(
 *   isValidDate(new Date('2023-01-15'), new Date('invalid')),
 *   false
 * )
 * ```
 */
export function isValidDate(...dates: unknown[]): boolean {
  for (const date of dates) {
    if (
      !(date instanceof Date) || Number.isNaN(date.getTime()) ||
      date.toString() === 'Invalid Date'
    ) {
      return false
    }
  }

  return true
}
