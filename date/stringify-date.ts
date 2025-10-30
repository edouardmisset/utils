import { isValidDate } from '@edouardmisset/date/is-valid-date.ts'
import { err, ok, type Result } from '@edouardmisset/function'

/**
 * Converts a Date object into a string in the format 'yyyy-mm-dd'.
 *
 * @param {Date} date - The date to convert.
 * @returns {Result<`${string}-${string}-${string}`, TypeError>} A Result containing either the date as a string in the format 'yyyy-mm-dd' or a TypeError if input is not a Date.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Valid date conversion
 * const result = stringifyDate(new Date(2022, 0, 31))
 * assertEquals(result.error, undefined)
 * assertEquals(result.data, '2022-01-31')
 * ```
 *
 * @example
 * ```typescript
 * import { assert } from '@std/assert'
 *
 * // Invalid date input
 * const result = stringifyDate('2022-01-01' as any)
 * assert(result.error instanceof TypeError)
 * assert(result.error.message.includes('Expected a valid Date object'))
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
