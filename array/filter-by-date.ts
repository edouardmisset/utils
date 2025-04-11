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
import { objectSize } from '@edouardmisset/object/object-size.ts'
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
 * options or if the date is invalid.
 *
 * @template Object_ - The type of object in the array to filter.
 * @param {keyof Object_} dateKey - The key of the date property in the objects to
 * filter.
 * @param {FilterOptions} [options={}] - The filter options to use.
 * @returns {(object_: Object_) => boolean} - A filter function that takes an object and
 * returns true if the object passes the filter, false otherwise.
 *
 * @example
 * ```typescript
 * // Filter an array of objects by a year
 * const dates = [{ date: new Date(2020, 0, 1) }, { date: new Date(2021, 0, 1) }]
 * const filter = filterByDate('date', { year: 2020 })
 * const result = dates.filter(filter)
 * // [{ date: new Date(2020, 0, 1) }]
 * ```
 *
 * @example
 * ```typescript
 * // Filter an array of objects by a date range
 * const dates = [{ date: new Date(2020, 0, 1) }, { date: new Date(2021, 0, 1) }]
 * const filter = filterByDate('date', { startDate: new Date(2020, 6, 1), endDate: new Date(2020, 11, 31) })
 * const result = dates.filter(filter)
 * // []
 * ```
 *
 * @example
 * ```typescript
 * // Filter an array of objects by a duration from a reference date
 * const dates = [{ date: new Date(2020, 0, 1) }, { date: new Date(2021, 0, 1) }]
 * const filter = filterByDate('date', { referenceDate: new Date(2020, 6, 1), durationInMS: 1000 * 60 * 60 * 24 * 180 }) // 180 days
 * const result = dates.filter(filter)
 * // [{ date: new Date(2020, 0, 1) }]
 * ```
 */
export function filterByDate<Object_ extends Record<string, unknown>>(
  dateKey: keyof Object_ = 'date',
  options: FilterOptions = {} as FilterOptions,
): (object_: Object_) => boolean {
  return (object_: Object_) => {
    if (objectSize(options) === 0) return true

    const dateValue = object_[dateKey]
    if (!isDateCompatible(dateValue)) return true

    const date = new Date(dateValue)
    if (!isValidDate(date)) return true

    if (isYearOption(options)) return isDateInYear(date, options.year)

    if (
      isDateInRangeOption(options)
    ) {
      if (!isValidDate(options.startDate, options.endDate)) {
        throw new Error('Invalid date range')
      }
      return isDateInRange(
        date,
        options,
      )
    }

    const {
      durationInMS = ONE_YEAR_IN_MILLISECONDS,
      referenceDate = new Date(),
    } = options

    return isDateInDuration(date, { referenceDate, durationInMS })
  }
}

/**
 * Alias for the {@link createDateFilter} function.
 */
export const filterByDateKey: typeof filterByDate = filterByDate
