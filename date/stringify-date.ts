import { isValidDate } from '@edouardmisset/date/is-valid-date.ts'
import { err, ok, type Result } from '../function/try-catch.ts'

/**
 * Converts a Date object into a string in the format 'yyyy-mm-dd'.
 *
 * @param {Date} date - The date to convert.
 * @returns {Result<`${string}-${string}-${string}`, TypeError>} A Result containing either the date as a string in the format 'yyyy-mm-dd' or a TypeError if input is not a Date.
 *
 * @example
 * ```typescript
 * import { stringifyDate } from '@edouardmisset/date'
 *
 * const date = new Date(2022, 0, 31) // January 31, 2022
 * const result = stringifyDate(date)
 * if (result.error) {
 *   console.log('Error:', result.error.message)
 * } else {
 *   console.log(result.data) // '2022-01-31'
 * }
 * ```
 *
 * @example
 * ```typescript
 * const result = stringifyDate('2022-01-01' as any)
 * if (result.error) {
 *   console.log('Error:', result.error.message)
 *   // Error: Expected a Date object for 2022-01-01 but got string
 * }
 * ```
 */
export function stringifyDate(
  date: Date,
): Result<`${string}-${string}-${string}`, TypeError> {
  if (!isValidDate(date)) {
    return err(
      new TypeError(
        `Expected a valid Date object for ${date} but got ${(typeof date) as unknown}`,
      ),
    )
  }

  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const result = `${year}-${month}-${day}` as `${string}-${string}-${string}`

  return ok(result)
}
