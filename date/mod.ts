// This module is browser compatible.

/**
 * Utility functions for working with dates.
 *
 * ```typescript
 * import { convertStringDate, lastDateOfMonth, firstDateOfMonth } from "./mod.ts"
 * import { assertEquals } from "@std/assert"
 *
 * const dateString = "2023/10/01"
 * const date = convertStringDate(dateString)
 * assertEquals(date instanceof Date, true)
 *
 * const last = lastDateOfMonth(new Date('2022-12-15'))
 * assertEquals(last.getDate(), 31)
 * const firstDate = firstDateOfMonth(new Date('2022-12-15'))
 * assertEquals(firstDate.getDate(), 1)
 * ```
 *
 * @module
 */

export * from './convert-string-date.ts'
export * from './first-last-date-of-month.ts'
