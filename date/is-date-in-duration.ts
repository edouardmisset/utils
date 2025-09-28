import { Milliseconds } from '@edouardmisset/type'

/**
 * Type representing a duration (in milliseconds) and a reference date (as
 * `Date` type).
 */
export type DurationAndReferenceDate = {
  durationInMS: Milliseconds
  referenceDate: Date
}

/**
 * Checks if the given date is within the duration from the reference date
 * (**inclusive**).
 *
 * @param {Date} date - The date to check.
 * @param {DurationAndReferenceDate} options - An object containing
 * the reference date and duration in milliseconds.
 * @returns {boolean} - True if the date is within the duration, false otherwise.
 */
export function isDateInDuration(
  date: Date,
  options: DurationAndReferenceDate,
): boolean {
  const { referenceDate, durationInMS } = options
  const referenceTime = referenceDate.getTime()
  const dateTime = date.getTime()
  return referenceTime - durationInMS <= dateTime && dateTime <= referenceTime
}
