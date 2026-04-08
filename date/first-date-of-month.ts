/**
 * Returns the first date of the month for a given date.
 *
 * @deprecated Deprecated and scheduled for removal in v6, native Temporal date handling should be preferred.
 *
 * Migration (native):
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const date = Temporal.PlainDate.from('2024-02-29')
 * const firstDay = date.with({ day: 1 })
 * assertEquals(firstDay, Temporal.PlainDate.from('2024-02-01'))
 * ```
 *
 * API availability:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate#browser_compatibility
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
