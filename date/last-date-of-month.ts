/**
 * Returns the last date of the month for a given date.
 *
 * @param {Date} [date=new Date()] - The date from which to extract the month. Defaults to the current date.
 * @returns {Date} The last date of the month.
 *
 * @example
 * // For a date input of '2022-12-15'
 * lastDateOfMonth(new Date('2022-12-15'))
 * // returns '2022-12-31'
 *
 * @example
 * // When no date input is provided
 * lastDateOfMonth()
 * // returns the last date of the current month
 */
export function lastDateOfMonth(date: Date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}
