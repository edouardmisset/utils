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
