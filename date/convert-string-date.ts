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
 * import { assertEquals } from '@std/assert'
 *
 * // Valid date conversion
 * const result = convertStringDate("01/01/2022 12:00")
 * assertEquals(result.error, undefined)
 * assertEquals(result.data, "2022-01-01T12:00")
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Empty string
 * const result = convertStringDate("")
 * assertEquals(result.error, undefined)
 * assertEquals(result.data, "")
 * ```
 *
 * @example
 * ```typescript
 * import { assert } from '@std/assert'
 *
 * // Invalid format
 * const result = convertStringDate("invalid date string")
 * assert(result.error instanceof Error)
 * assert(result.error.message.includes('Invalid date format'))
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
