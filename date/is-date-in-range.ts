/**
 * Type representing a start and end date (as `Date` types).
 */
export type StartAndEndDate = {
  startDate: Date
  endDate: Date
}

/**
 * Checks if the given option is of type StartAndEndDate.
 *
 * @param {unknown} option - The option to check.
 * @returns {boolean} - True if the option is of type StartAndEndDate, false
 * otherwise.
 */
export function isDateInRangeOption(
  option: unknown,
): option is StartAndEndDate {
  return (option as StartAndEndDate)?.startDate !== undefined &&
    (option as StartAndEndDate)?.endDate !== undefined
}

/**
 * Checks if the given date is within the given start and end dates (**inclusive**).
 *
 * @param {Date} date - The date to check.
 * @param {StartAndEndDate} options - An object containing the start and end
 * dates of the range.
 * @returns {boolean} - True if the date is within the range, false otherwise.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Date within range
 * assertEquals(
 *   isDateInRange(
 *     new Date('2023-06-15'),
 *     { startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') }
 *   ),
 *   true
 * )
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Date outside range
 * assertEquals(
 *   isDateInRange(
 *     new Date('2024-01-15'),
 *     { startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') }
 *   ),
 *   false
 * )
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Edge case: date equals start date (inclusive)
 * assertEquals(
 *   isDateInRange(
 *     new Date('2023-01-01'),
 *     { startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') }
 *   ),
 *   true
 * )
 * ```
 */
export function isDateInRange(
  date: Date,
  options: StartAndEndDate,
): boolean {
  const { startDate, endDate } = options
  return startDate <= date && date <= endDate
}
