import { isValidDate } from '@edouardmisset/date'
import { err, ok, type Result } from '@edouardmisset/function'

/**
 * Parses a date string in the format 'MM-DD-YYYY' and returns a Date object.
 *
 * @param {string} stringDate - The date string to parse, formatted as 'MM-DD-YYYY'.
 * @returns {Result<Date, Error>} A Result containing either the parsed Date object or an Error if the format is invalid.
 *
 * @example
 * ```typescript
 * const result = parseDate('12-25-2023')
 * if (result.error) {
 *   console.log('Parse error:', result.error.message)
 * } else {
 *   console.log('Parsed date:', result.data)
 * }
 * ```
 *
 * @example
 * ```typescript
 * const result = parseDate('invalid-date')
 * if (result.error) {
 *   console.log('Parse error:', result.error.message) // "Invalid date format"
 * }
 * ```
 */
export function parseDate(stringDate: string): Result<Date, Error> {
  const datePattern = /^(\d{2})-(\d{2})-(\d{4})$/
  const [, month, day, year] = datePattern.exec(stringDate) ?? []
  const parsedDate = new Date(`${year}-${month}-${day}`)

  if (!isValidDate(parsedDate)) {
    return err(new Error('Invalid date format'))
  }

  return ok(parsedDate)
}

/**
 * Parses a date string in the format 'DD-MM-YYYY' and returns a Date object.
 *
 * @param {string} stringDate - The date string to parse, formatted as 'DD-MM-YYYY'.
 * @returns {Result<Date, Error>} A Result containing either the parsed Date object or an Error if the format is invalid.
 *
 * @example
 * ```typescript
 * const result = parseFrenchDate('25-12-2023')
 * if (result.error) {
 *   console.log('Parse error:', result.error.message)
 * } else {
 *   console.log('Parsed date:', result.data)
 * }
 * ```
 *
 * @example
 * ```typescript
 * const result = parseFrenchDate('invalid-date')
 * if (result.error) {
 *   console.log('Parse error:', result.error.message) // "Invalid date format"
 * }
 * ```
 */
export function parseFrenchDate(stringDate: string): Result<Date, Error> {
  const datePattern = /^(\d{2})-(\d{2})-(\d{4})$/
  const [, day, month, year] = datePattern.exec(stringDate) ?? []
  const parsedDate = new Date(`${year}-${month}-${day}`)

  return isValidDate(parsedDate)
    ? ok(parsedDate)
    : err(new Error('Invalid date format'))
}
