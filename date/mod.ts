// This module is browser compatible.

/**
 * Utility functions for working with dates.
 *
 * ```typescript
 * import { convertStringDate, lastDateOfMonth, firstDateOfMonth } from "@edouardmisset/date"
 * import { assertEquals } from "@std/assert"
 *
 * const date = convertStringDate('31/12/2022 12:00')
 * assertEquals(date, "2022-12-31T12:00")
 *
 * const lastDate = lastDateOfMonth(new Date('2022-12-30'))
 * assertEquals(lastDate.getDate(), 31)
 * const firstDate = firstDateOfMonth(new Date('2022-12-30'))
 * assertEquals(firstDate.getDate(), 1)
 * ```
 *
 * @module
 */

export * from './convert-string-date.ts'
export * from './first-last-date-of-month.ts'
export * from './is-date-compatible.ts'
export * from './is-date-in-duration.ts'
export * from './is-date-in-range.ts'
export * from './is-date-in-year.ts'
export * from './is-valid-date.ts'
export * from './parse-date.ts'
