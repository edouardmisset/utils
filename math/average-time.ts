import { average } from '@edouardmisset/math/average.ts'
import { err, ok, Result } from '../function/try-catch.ts'

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
 * import { averageTime } from './average-time.ts'
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
  if (dates.length === 0) return ok('00:00:00')

  const datesInMs = dates.map((date) => {
    const newDate = new Date(date)
    newDate.setUTCFullYear(2000, 0, 1)
    return newDate.getTime()
  })

  const averageResult = average(datesInMs)

  if (averageResult.error) return err(averageResult.error)

  const averageTime = new Date(averageResult.data).toISOString().slice(11, 19)

  return ok(averageTime)
}
