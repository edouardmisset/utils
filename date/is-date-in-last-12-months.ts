import { isValidDate } from '@edouardmisset/date'
import { Result } from '../function/try-catch.ts'

/**
 * Determines if a given date is within the last 12 months from the current date.
 *
 * This function calculates a cutoff date exactly one year ago from the current
 * date (with the time set to midnight) and checks if the provided date falls
 * within this range.
 *
 * @param {string | Date} date - The date to evaluate. Can be a string in a
 * valid date format or a Date object.
 * @returns {Result<boolean, Error>} A Result containing either a boolean indicating if the date is within the last 12 months, or an Error if the date is invalid.
 *
 * @example
 * ```typescript
 * const result = isDateInLast12Months(new Date())
 * if (result.error) {
 *   console.log('Error:', result.error.message)
 * } else {
 *   console.log('Is within last 12 months:', result.data) // true
 * }
 * ```
 *
 * @example
 * ```typescript
 * const result = isDateInLast12Months('invalid-date')
 * if (result.error) {
 *   console.log('Error:', result.error.message) // "Invalid date format."
 * }
 * ```
 */
export function isDateInLast12Months(
  date: string | Date,
): Result<boolean, Error> {
  const parsedDate = typeof date === 'string' ? new Date(date) : date

  if (!isValidDate(parsedDate)) {
    return {
      data: undefined,
      error: new Error('Invalid date format.'),
    }
  }

  const now = new Date()
  const lastYear = new Date()
  lastYear.setFullYear(now.getFullYear() - 1)
  lastYear.setHours(0, 0, 0, 0)
  const result = lastYear <= parsedDate && parsedDate <= now

  return {
    data: result,
    error: undefined,
  }
}
