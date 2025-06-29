import { isDateCompatible } from '@edouardmisset/date/is-date-compatible.ts'
import {
  DurationAndReferenceDate,
  isDateInDuration,
} from '@edouardmisset/date/is-date-in-duration.ts'
import {
  isDateInRange,
  isDateInRangeOption,
  StartAndEndDate,
} from '@edouardmisset/date/is-date-in-range.ts'
import {
  isDateInYear,
  isYearOption,
  Year,
} from '@edouardmisset/date/is-date-in-year.ts'
import { isValidDate } from '@edouardmisset/date/is-valid-date.ts'
import type { ObjectOfType } from '@edouardmisset/type'
import { err, ok, Result } from '../function/try-catch.ts'
import { size } from '../object/size.ts'
import { ONE_YEAR_IN_MILLISECONDS } from './filter.ts'

/**
 * The filter options for the {@link filterByDate} function.
 * This can be a year, a start and end date, or a duration from a reference date.
 */
export type FilterOptions = Year | StartAndEndDate | DurationAndReferenceDate

/**
 * Creates a filter function that can be used to filter an array of objects
 * based on a date property and provided filter options.
 *
 * NOTE: By default it checks if the date provided is within the last year
 *
 * NOTE 2: The filter function will return true if the object does not have a
 * valid date, if the date is invalid, or if there are validation errors.
 *
 * @template Object_ - The type of object in the array to filter.
 * @param {keyof Object_} dateKey - The key of the date property in the objects to
 * filter.
 * @param {FilterOptions} [options={}] - The filter options to use.
 * @returns {Result<(object_: Object_) => boolean, Error>} - Returns a Result containing either a filter function or an Error for invalid date ranges.
 *
 * @example
 * ```typescript
 * // Filter an array of objects by a year
 * const dates = [{ date: new Date(2020, 0, 1) }, { date: new Date(2021, 0, 1) }]
 * const result = filterByDate('date', { year: 2020 })
 * if (result.error) {
 *   console.log('Error:', result.error.message)
 * } else {
 *   const filtered = dates.filter(result.data)
 *   // [{ date: new Date(2020, 0, 1) }]
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Filter an array of objects by a date range
 * const dates = [{ date: new Date(2020, 0, 1) }, { date: new Date(2021, 0, 1) }]
 * const result = filterByDate('date', { startDate: new Date(2020, 6, 1), endDate: new Date(2020, 11, 31) })
 * if (result.error) {
 *   console.log('Error:', result.error.message)
 * } else {
 *   const filtered = dates.filter(result.data)
 *   // []
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Filter an array of objects by a duration from a reference date
 * const dates = [{ date: new Date(2020, 0, 1) }, { date: new Date(2021, 0, 1) }]
 * const result = filterByDate('date', { referenceDate: new Date(2020, 6, 1), durationInMS: 1000 * 60 * 60 * 24 * 180 }) // 180 days
 * if (result.error) {
 *   console.log('Error:', result.error.message)
 * } else {
 *   const filtered = dates.filter(result.data)
 *   // [{ date: new Date(2020, 0, 1) }]
 * }
 * ```
 */
export function filterByDate<Object_ extends ObjectOfType<unknown>>(
  dateKey: keyof Object_ = 'date',
  options: FilterOptions = {} as FilterOptions,
): Result<(object_: Object_) => boolean, Error> {
  // Check for invalid date range up front
  if (
    isDateInRangeOption(options) &&
    !isValidDate(options.startDate, options.endDate)
  ) {
    return err(new Error('Invalid date range'))
  }

  const filterFunction = (o: Object_) => {
    if (size(options) === 0) return true

    const dateValue = o[dateKey]
    if (!isDateCompatible(dateValue)) return true

    const date = new Date(dateValue)
    if (!isValidDate(date)) return true

    if (isYearOption(options)) return isDateInYear(date, options.year)

    if (isDateInRangeOption(options)) {
      return isDateInRange(date, options)
    }

    const {
      durationInMS = ONE_YEAR_IN_MILLISECONDS,
      referenceDate = new Date(),
    } = options

    return isDateInDuration(date, { referenceDate, durationInMS })
  }

  return ok(filterFunction)
}

/**
 * Alias for the {@link createDateFilter} function.
 */
export const filterByDateKey: typeof filterByDate = filterByDate
