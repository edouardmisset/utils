import { isValidDate } from '@edouardmisset/date'
import { Integer } from '@edouardmisset/type'

/**
 * Type representing a year as an integer (number).
 */
export type YearOption = {
  year: Integer
}

/**
 * Checks if the given option is of type Year.
 *
 * @param {unknown} option - The option to check.
 * @returns {boolean} - True if the option is of type Year, false otherwise.
 */
export function isYearOption(option: unknown): option is YearOption {
  return (option as YearOption)?.year !== undefined
}

/**
 * Checks if the provided date string corresponds to a date in the specified year.
 *
 * Converts the given string to a Date object and validates it using `isValidDate`.
 * If the date is invalid, logs an error message.
 *
 * @param {string | Date} date - The date represented as a string or Date.
 * @param {number} year - The year to compare against.
 * @returns {boolean} True if the Date object's year matches the specified year;
 * otherwise, false.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Date in specified year
 * assertEquals(isDateInYear('2023-06-15', 2023), true)
 * assertEquals(isDateInYear(new Date('2023-06-15'), 2023), true)
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Date not in specified year
 * assertEquals(isDateInYear('2024-01-15', 2023), false)
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Invalid date
 * assertEquals(isDateInYear('invalid-date', 2023), false)
 * ```
 */
export function isDateInYear(date: string | Date, year: number): boolean {
  const parsedDate = typeof date === 'string' ? new Date(date) : date
  if (!isValidDate(parsedDate)) {
    globalThis.console.error(
      `[isDateInYear] Invalid date provided: ${parsedDate}. Input was: date=${date}, year=${year}`,
    )
    return false
  }
  return parsedDate.getFullYear() === year
}
