// This module is browser compatible.

/**
 * Comprehensive date manipulation utilities for parsing, formatting, and date
 * calculations.
 * Includes functions for date conversion, boundary calculations, and date
 * arithmetic.
 * E.g. {@link parseDate}, {@link isValidDate}, {@link convertStringDate},
 * {@link firstDateOfMonth}
 *
 * @example
 * ```ts
 * import { convertStringDate, lastDateOfMonth, firstDateOfMonth } from "jsr:@edouardmisset/date";
 * import { assertEquals } from "@std/assert";
 *
 * //  convertStringDate function
 * const isoResult = convertStringDate('31/12/2022 12:00');
 * assertEquals(isoResult.error, undefined);
 * assertEquals(isoResult.data, "2022-12-31T12:00");
 *
 * //  month boundary functions
 * const date = new Date('2022-12-15');
 *
 * const lastDay = lastDateOfMonth(date);
 * assertEquals(lastDay.getDate(), 31);
 * assertEquals(lastDay.getMonth(), 11); // December is month 11
 *
 * const firstDay = firstDateOfMonth(date);
 * assertEquals(firstDay.getDate(), 1);
 * assertEquals(firstDay.getMonth(), 11);
 * ```
 *
 * @module
 */

export * from './convert-string-date.ts'
export * from './datification.ts'
export * from './first-date-of-month.ts'
export * from './is-date-compatible.ts'
export * from './is-date-in-duration.ts'
export * from './is-date-in-last-12-months.ts'
export * from './is-date-in-range.ts'
export * from './is-date-in-year.ts'
export * from './is-valid-date.ts'
export * from './last-date-of-month.ts'
export * from './parse-date.ts'
export * from './sort-by-date.ts'
export * from './stringify-date.ts'
