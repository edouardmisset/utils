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
 */
export function isDateInRange(
  date: Date,
  options: StartAndEndDate,
): boolean {
  const { startDate, endDate } = options
  return startDate <= date && date <= endDate
}
