import { isValidDate } from '@edouardmisset/date'
import { err, ok, type Result } from '@edouardmisset/function'

/**
 * Converts a string date from "dd/mm/yyyy hh:mm" format to "yyyy-mm-ddThh:mm" format.
 * If the input string is empty, it returns an empty string.
 * If the input string does not match the expected format, it returns an error.
 *
 * @param {string} dateString - The date string to be converted. Must be in "dd/mm/yyyy hh:mm" format.
 * @returns {Result<string, Error>} A Result containing either the converted date string in "yyyy-mm-ddThh:mm" format or an Error if the format is invalid.
 *
 * @example
 * ```typescript
 * const result = convertStringDate("01/01/2022 12:00")
 * if (result.error) {
 *   console.log('Error:', result.error.message)
 * } else {
 *   console.log(result.data) // "2022-01-01T12:00"
 * }
 * ```
 *
 * @example
 * ```typescript
 * const result = convertStringDate("")
 * if (result.error) {
 *   console.log('Error:', result.error.message)
 * } else {
 *   console.log(result.data) // ""
 * }
 * ```
 *
 * @example
 * ```typescript
 * const result = convertStringDate("invalid date string")
 * if (result.error) {
 *   console.log('Error:', result.error.message)
 *   // Error: Invalid date format (invalid date string).
 *   // It should be in the form: "dd/mm/yyyy hh:mm"
 * }
 * ```
 */
export function convertStringDate(dateString: string): Result<string, Error> {
  if (dateString === '') return ok(dateString)

  if (!/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/.test(dateString)) {
    return err(
      new Error(
        `Invalid date format (${String(dateString)}). 
It should be in the form: "dd/mm/yyyy hh:mm"`,
      ),
    )
  }

  const [shortDate, shortTime = ''] = dateString.split(' ')
  const [days, months, years] = shortDate.split('/')
  const [hours = 0, minutes = 0] = shortTime.split(':')
  const result = `${years}-${months}-${days}T${hours}:${minutes}`

  return ok(result)
}

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

  const ISO8601DatePattern =
    /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/

  if (!ISO8601DatePattern.test(date)) {
    return err(
      new Error(
        `Invalid date format (${String(date)}).
It should follow the ISO 8601 standard like: "YYYY-MM-DDTHH:MM:SSZ"`,
      ),
    )
  }

  return ok(new Date(date))
}

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
