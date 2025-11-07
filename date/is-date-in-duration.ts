import { Milliseconds } from '@edouardmisset/type'

/**
 * Type representing the parameter object for date-in-duration checks.
 */
export type DurationAndReferenceDate = {
  /* The duration in milliseconds defining the time window. Positive values
  indicate a future duration, while negative values indicate a past duration.
  */
  durationInMS: Milliseconds
  /* The reference date from which the duration is measured. */
  referenceDate: Date
}

/**
 * Checks if the given date is within the duration from the reference date
 * (**inclusive**).
 *
 * **NOTE**: This function handles both positive (future) and negative (past)
 * durations.
 *
 * @param {Date} date - The date to check.
 * @param {Date} options.referenceDate - The reference date to compare against.
 * @param {Milliseconds} options.durationInMS - The duration in milliseconds.
 * @returns {boolean} - True if the date is within the duration, false otherwise.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Date within future duration (7 days = 604800000 ms)
 * const refDate = new Date('2023-01-01')
 * const dateInRange = new Date('2023-01-05')
 * assertEquals(
 *   isDateInDuration(dateInRange, { referenceDate: refDate, durationInMS: 604800000 }),
 *   true
 * )
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Date within past duration (negative duration)
 * const refDate = new Date('2023-01-10')
 * const dateInPast = new Date('2023-01-05')
 * assertEquals(
 *   isDateInDuration(dateInPast, { referenceDate: refDate, durationInMS: -604800000 }),
 *   true
 * )
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Date outside duration
 * const refDate = new Date('2023-01-01')
 * const dateOutOfRange = new Date('2023-02-01')
 * assertEquals(
 *   isDateInDuration(dateOutOfRange, { referenceDate: refDate, durationInMS: 604800000 }),
 *   false
 * )
 * ```
 */
export function isDateInDuration(
  date: Date,
  options: DurationAndReferenceDate,
): boolean {
  const { referenceDate, durationInMS } = options
  const referenceTime = referenceDate.getTime()
  const dateTime = date.getTime()
  const startTime = Math.min(referenceTime, referenceTime + durationInMS)
  const endTime = Math.max(referenceTime, referenceTime + durationInMS)

  return startTime <= dateTime && dateTime <= endTime
}
