/**
 * Calculates the average of the given numbers.
 *
 * @param {number[] | number} number_ - The numbers to calculate the average of.
 * @throws {Error} When no arguments are provided.
 * @returns {number} The average of the given numbers.
 *
 * @example
 * ```typescript
 * average(1, 2, 3, 4, 5)
 * // returns 3
 * ```
 *
 * @example
 * ```typescript
 * average([1, 2, 3, 4, 5])
 * // returns 3
 * ```
 */
export function average(...number_: (number[] | number)[]): number {
  const numbers = number_.flat()

  if (numbers.length === 0) {
    throw new Error(
      `Cannot calculate average if no values are passed in (${
        String(number_)
      })`,
    )
  }

  return (
    numbers.reduce((accumulator, value) => accumulator + value, 0) /
    numbers.length
  )
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
 * @returns {string} The average time in the format "HH:MM:SS".
 *
 * @example
 * ```typescript
 * import { averageTime } from './average.ts'
 *
 * const dates = [new Date('2022-01-01T09:00:00Z'), new Date('2022-01-01T11:00:00Z')]
 * averageTime(dates)
 * // returns "10:00:00"
 * ```
 */
export function averageTime(dates: Date[]): string {
  if (dates.length === 0) {
    return '00:00:00'
  }

  const datesInMs = dates.map((date) => {
    const newDate = new Date(date)
    newDate.setUTCFullYear(2000, 0, 1)
    return newDate.getTime()
  })
  const averageDate = new Date(average(datesInMs))

  return averageDate.toISOString().slice(11, 19)
}
