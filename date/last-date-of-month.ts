/**
 * Returns the last date of the month for a given date.
 *
 * @param {Date} [date=new Date()] - The date from which to extract the month. Defaults to the current date.
 * @returns {Date} The last date of the month.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // December 2022 has 31 days
 * assertEquals(
 *   lastDateOfMonth(new Date('2022-12-15')),
 *   new Date(2022, 11, 31)
 * )
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // February 2024 (leap year) has 29 days
 * assertEquals(
 *   lastDateOfMonth(new Date('2024-02-10')),
 *   new Date(2024, 1, 29)
 * )
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // February 2023 (non-leap year) has 28 days
 * assertEquals(
 *   lastDateOfMonth(new Date('2023-02-15')),
 *   new Date(2023, 1, 28)
 * )
 * ```
 */
export function lastDateOfMonth(date: Date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}
