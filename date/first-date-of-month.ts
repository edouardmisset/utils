/**
 * Returns the first date of the month for a given date.
 *
 * @param {Date} [date=new Date()] - The date from which to extract the month. Defaults to the current date.
 * @returns {Date} The first date of the month.
 *
 * @example
 * ```typescript
 * import { assert } from '@std/assert'
 *
 * // Using the current date (default parameter)
 * const firstDay = firstDateOfMonth();
 * assert(firstDay.getDate() === 1) // First day of the current month
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // December 2022
 * assertEquals(
 *   firstDateOfMonth(new Date('2022-12-15')),
 *   new Date(2022, 11, 1)
 * )
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // February (leap year)
 * assertEquals(
 *   firstDateOfMonth(new Date('2024-02-29')),
 *   new Date(2024, 1, 1)
 * )
 * ```
 */
export function firstDateOfMonth(date: Date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}
