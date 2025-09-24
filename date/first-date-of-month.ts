/**
 * Returns the first date of the month for a given date.
 *
 * @param {Date} [date=new Date()] - The date from which to extract the month. Defaults to the current date.
 * @returns {Date} The first date of the month.
 *
 * @example
 * // For a date input of '2022-12-15'
 * firstDateOfMonth(new Date('2022-12-15'))
 * // returns '2022-12-01'
 *
 * @example
 * // When no date input is provided
 * firstDateOfMonth()
 * // returns the first date of the current month
 */
export function firstDateOfMonth(date: Date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}