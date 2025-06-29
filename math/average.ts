import { err, Result } from '../function/try-catch.ts'

/**
 * Calculates the average of the given numbers.
 *
 * @param {...(number[] | number)[]} number_ - The numbers to calculate the average of.
 * @returns {Result<number, Error>} A result object containing either the average or an error.
 *
 * @example
 * ```typescript
 * const result = average(1, 2, 3, 4, 5)
 * if (result.error) {
 *   console.error('Average calculation failed:', result.error.message)
 * } else {
 *   console.log('Average:', result.data) // 3
 * }
 * ```
 *
 * @example
 * ```typescript
 * const result = average([1, 2, 3, 4, 5])
 * if (result.error) {
 *   console.error('Average calculation failed:', result.error.message)
 * } else {
 *   console.log('Average:', result.data) // 3
 * }
 * ```
 *
 * @example
 * ```typescript
 * const result = average()
 * if (result.error) {
 *   console.log('Error:', result.error.message) // "Cannot calculate average if no values are passed in"
 * }
 * ```
 */
export function average(
  ...number_: (number[] | number)[]
): Result<number, Error> {
  const numbers = number_.flat()

  if (numbers.length === 0) {
    return {
      data: undefined,
      error: new Error(
        `Cannot calculate average if no values are passed in (${
          String(number_)
        })`,
      ),
    }
  }

  return {
    data: (
      numbers.reduce((accumulator, value) => accumulator + value, 0) /
      numbers.length
    ),
    error: undefined,
  }
}

/**
 * Alias for the {@link average} function.
 */
export const mean: typeof average = average

/**
 * Calculates the average time from an array of Date objects and returns it as a
 * string.
 *
 * **Note:** For best results, the dates should be in the same timezone, in the
 * format ("YYYY-MM-DDTHH:MM:SSZ") `2022-01-01T01:00:00Z` (ISO 8601).
 * The time is calculated as if all the dates were on the same day.
 *
 * @param {Date[]} dates The array of Date objects.
 * @returns {Result<string, Error>} A result object containing either the average time in the format "HH:MM:SS" or an error.
 *
 * @example
 * ```typescript
 * import { averageTime } from './average.ts'
 *
 * const dates = [new Date('2022-01-01T09:00:00Z'), new Date('2022-01-01T11:00:00Z')]
 * const result = averageTime(dates)
 * if (result.error) {
 *   console.error('Average time calculation failed:', result.error.message)
 * } else {
 *   console.log('Average time:', result.data) // "10:00:00"
 * }
 * ```
 */
export function averageTime(dates: Date[]): Result<string, Error> {
  if (dates.length === 0) {
    return { data: '00:00:00', error: undefined }
  }

  const datesInMs = dates.map((date) => {
    const newDate = new Date(date)
    newDate.setUTCFullYear(2000, 0, 1)
    return newDate.getTime()
  })

  const averageResult = average(datesInMs)
  if (averageResult.error) {
    return err(averageResult.error)
  }

  const averageDate = new Date(averageResult.data)
  return { data: averageDate.toISOString().slice(11, 19), error: undefined }
}
