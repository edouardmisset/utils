import { isValidDate } from '@edouardmisset/date/is-valid-date.ts'
import { err, ok, type Result } from '@edouardmisset/function'

// ISO8601_DATE_PATTERN matches ISO 8601 date strings, including:
// - Calendar dates (YYYY-MM-DD)
// - Week dates (YYYY-Www or YYYY-Www-D)
// - Ordinal dates (YYYY-DDD)
// - Optional time and timezone components (THH:mm:ss.sssZ or ±hh:mm)
// See: https://en.wikipedia.org/wiki/ISO_8601
const ISO8601_DATE_PATTERN =
  /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/

/**
 * Converts a string or a Date object into a Date object.
 *
 * If the input is a string, it assumes the string is a valid date string (ISO
 * 8601 format: YYYY-MM-DDTHH:MM:SSZ // ie: 2024-03-06T16:09:03Z).
 * If the input is already a Date object, it returns the input as is.
 *
 * @param {(string | Date)} date - The input to convert into a Date object. If
 * it's a string, it should be in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ).
 * @returns {Result<Date, Error>} A Result containing either the converted Date object or an Error if the format is invalid.
 *
 * @example
 * ```typescript
 * const result = datification('2022-01-01T12:00')
 * if (result.error) {
 *   console.log('Error:', result.error.message)
 * } else {
 *   console.log(result.data) // new Date('2022-01-01T12:00')
 * }
 * ```
 *
 * @example
 * ```typescript
 * const result = datification(new Date('2022-01-01T12:00'))
 * if (result.error) {
 *   console.log('Error:', result.error.message)
 * } else {
 *   console.log(result.data) // new Date('2022-01-01T12:00')
 * }
 * ```
 *
 * @example
 * ```typescript
 * const result = datification('01012000')
 * if (result.error) {
 *   console.log('Error:', result.error.message)
 *   // Error: Invalid date format (01012000).
 *   // It should follow the ISO 8601 standard like: "YYYY-MM-DDTHH:MM:SSZ"
 * }
 * ```
 */
export function datification(date: string | Date): Result<Date, Error> {
  if (date instanceof Date) {
    return isValidDate(date) ? ok(date) : err(
      new TypeError(
        `Invalid date format (${String(date)}).
It should follow the ISO 8601 standard like: "YYYY-MM-DDTHH:MM:SSZ"`,
      ),
    )
  }

  if (!ISO8601_DATE_PATTERN.test(date)) {
    return err(
      new Error(
        `Invalid date format (${String(date)}).
It should follow the ISO 8601 standard like: "YYYY-MM-DDTHH:MM:SSZ"`,
      ),
    )
  }

  return ok(new Date(date))
}
