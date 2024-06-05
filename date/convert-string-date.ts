/**
 * Converts a string date from "dd/mm/yyyy hh:mm" format to "yyyy-mm-ddThh:mm" format.
 * If the input string is empty, it returns an empty string.
 * If the input string does not match the expected format, it throws an error.
 *
 * @param {string} dateString - The date string to be converted. Must be in "dd/mm/yyyy hh:mm" format.
 * @returns {string} - The converted date string in "yyyy-mm-ddThh:mm" format.
 * @throws {Error} - Throws an error if the input string does not match the expected format.
 *
 * @example
 * ```typescript
 * convertStringDate("01/01/2022 12:00")
 * // returns "2022-01-01T12:00"
 * ```
 *
 * @example
 * ```typescript
 * convertStringDate("")
 * // returns ""
 * ```
 *
 * @example
 * ```typescript
 * convertStringDate("invalid date string")
 * // throws Error: Invalid date format
 * ```
 */
export function convertStringDate(dateString: string): string {
  if (dateString === '') return dateString
  if (!/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/gi.test(dateString)) {
    throw new Error(
      'Invalid date format. It should be in the form: `dd/mm/yyyy hh:mm`',
    )
  }

  const [shortDate, shortTime = ''] = dateString.split(' ')
  const [days, months, years] = shortDate.split('/')
  const [hours = 0, minutes = 0] = shortTime.split(':')
  return `${years}-${months}-${days}T${hours}:${minutes}`
}

/**
 * Converts a string or a Date object into a Date object.
 *
 * If the input is a string, it assumes the string is a valid date string (ISO
 * 8601 format: YYYY-MM-DDTHH:MM:SSZ // ie: 2024-03-06T09:09:03Z).
 * If the input is already a Date object, it returns the input as is.
 *
 * @param {(string | Date)} date - The input to convert into a Date object. If it's a string, it should be in UTC format (YYYY-MM-DDTHH:MM).
 * @returns {Date} - The converted Date object.
 *
 * @example
 * ```typescript
 * datification('2022-01-01T12:00')
 * // returns new Date('2022-01-01T12:00')
 * ```
 *
 * @example
 * ```typescript
 * datification(new Date('2022-01-01T12:00'))
 * // returns new Date('2022-01-01T12:00')
 * ```
 */
export function datification(date: string | Date): Date {
  return typeof date === 'string' ? new Date(date) : date
}

/**
 * Converts a Date object into a string in the format 'yyyy-mm-dd'.
 *
 * @param {Date} date - The date to convert.
 * @returns {string} The date as a string in the format 'yyyy-mm-dd'.
 *
 * @example
 * ```typescript
 * import { stringifyDate } from './convert-string-date.ts'
 *
 * const date = new Date(2022, 0, 31) // January 31, 2022
 * stringifyDate(date)
 * // returns '2022-01-31'
 * ```
 */
export function stringifyDate(date: Date): `${string}-${string}-${string}` {
  if (!(date instanceof Date)) {
    throw new TypeError(
      `Expected a Date object for ${date} but got ${typeof date}`,
    )
  }

  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}
