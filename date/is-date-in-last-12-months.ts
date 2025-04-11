import { isValidDate } from '@edouardmisset/date'

/**
 * Determines if a given date is within the last 12 months from the current date.
 *
 * This function calculates a cutoff date exactly one year ago from the current
 * date (with the time set to midnight) and checks if the provided date falls
 * within this range.
 *
 * @param {string | Date} date - The date to evaluate. Can be a string in a
 * valid date format or a Date object.
 * @throws {Error} Throws an error if the date is not valid.
 * @returns {boolean} Returns `true` if the date is within the last 12 months,
 * otherwise `false`.
 */
export function isDateInLast12Months(date: string | Date): boolean {
  const parsedDate = typeof date === 'string' ? new Date(date) : date

  if (!isValidDate(parsedDate)) {
    throw new Error('Invalid date format.')
  }

  const now = new Date()
  const lastYear = new Date()
  lastYear.setFullYear(now.getFullYear() - 1)
  lastYear.setHours(0, 0, 0, 0)
  return lastYear <= parsedDate && parsedDate <= now
}
