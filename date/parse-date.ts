import { isValidDate } from '@edouardmisset/date'
import { err, ok, type Result } from '@edouardmisset/function'

/**
 * Date format types supported by the parseDate function. The following formats are supported:
 * - International (ISO 8601): 'YYYY-MM-DD'
 * - US: 'MM-DD-YYYY'
 * - European: 'DD-MM-YYYY'
 */
export type DateFormat = 'YYYY-MM-DD' | 'MM-DD-YYYY' | 'DD-MM-YYYY'

type DateParts = { year: string; month: string; day: string }

/**
 * Regex components for date validation
 */
/** Matches year from 0001 to 9999 */
const YEAR_PATTERN = String.raw`\d{4}`
/** Matches month from 01 to 12 */
const MONTH_PATTERN = String.raw`0[1-9]|1[0-2]`
/** Matches day from 01 to 31 */
const DAY_PATTERN = String.raw`0[1-9]|[12]\d|3[01]`

const DATE_FORMAT_PATTERNS = {
  'YYYY-MM-DD': {
    pattern: new RegExp(
      `^(${YEAR_PATTERN})-(${MONTH_PATTERN})-(${DAY_PATTERN})$`,
    ),
    map: ([, year, month, day]) => ({ year, month, day }),
  },
  'MM-DD-YYYY': {
    pattern: new RegExp(
      `^(${MONTH_PATTERN})-(${DAY_PATTERN})-(${YEAR_PATTERN})$`,
    ),
    map: ([, month, day, year]) => ({ year, month, day }),
  },
  'DD-MM-YYYY': {
    pattern: new RegExp(
      `^(${DAY_PATTERN})-(${MONTH_PATTERN})-(${YEAR_PATTERN})$`,
    ),
    map: ([, day, month, year]) => ({ year, month, day }),
  },
} as const satisfies Record<
  DateFormat,
  { pattern: RegExp; map: (parts: RegExpExecArray) => DateParts }
>

/**
 * Parses a date string in the specified format and returns a Date object.
 *
 * @param {string} stringDate - The date string to parse.
 * @param {DateFormat} format - The expected date format. Defaults to 'YYYY-MM-DD'.
 * @returns {Result<Date, Error>} A Result containing either the parsed Date object or an Error if the format is invalid.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const result = parseDate('2023-12-25')
 * assertEquals(result.error, undefined)
 * assertEquals(result.data?.toISOString(), new Date('2023-12-25').toISOString())
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const result = parseDate('12-25-2023', 'MM-DD-YYYY')
 * assertEquals(result.error, undefined)
 * assertEquals(result.data?.toISOString(), new Date('2023-12-25').toISOString())
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const result = parseDate('25-12-2023', 'DD-MM-YYYY')
 * assertEquals(result.error, undefined)
 * assertEquals(result.data?.toISOString(), new Date('2023-12-25').toISOString())
 * ```
 *
 * @example
 * ```typescript
 * import { assert } from '@std/assert'
 *
 * const result = parseDate('invalid-date')
 * assert(result.error?.message.includes('Invalid date format'))
 * ```
 */
export function parseDate(
  stringDate: string,
  format: DateFormat = 'YYYY-MM-DD',
): Result<Date, Error> {
  const { pattern, map } = DATE_FORMAT_PATTERNS[format]
  const match = pattern.exec(stringDate)

  if (match === null) {
    return err(
      new Error(
        `Invalid date format. Expected format: ${format}. Received: "${stringDate}". Ensure year is 0001-9999, month is 01-12, and day is 01-31.`,
      ),
    )
  }

  const { year, month, day } = map(match)

  const parsedDate = new Date(`${year}-${month}-${day}`)

  if (!isValidDate(parsedDate)) {
    return err(
      new Error(
        `Invalid date values. The date ${day}/${month}/${year} does not exist (e.g., February 30th, invalid leap year)`,
      ),
    )
  }

  return ok(parsedDate)
}
