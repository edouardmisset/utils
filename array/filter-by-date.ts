import {
  DurationAndReferenceDate,
  isDateCompatible,
  isDateInDuration,
  isDateInRange,
  isDateInRangeOption,
  isDateInYear,
  isValidDate,
  isYearOption,
  StartAndEndDate,
  YearOption,
} from '@edouardmisset/date'
import { err, ok, type Result } from '@edouardmisset/function'
import { size } from '@edouardmisset/object'
import type { ObjectOfType } from '@edouardmisset/type'

/**
 * Creates a filter function that can be used to filter an array of objects
 * based on a date property and provided filter options.
 *
 * NOTE: By default it checks if the date provided is within the last year
 *
 * NOTE 2: The filter function filters out objects that do not have a valid
 * date.
 *
 * @template Object_ - The type of object in the array to filter.
 * @param {Object_[]} array - The array of objects to filter.
 * @param {keyof Object_} dateKey - The key of the date property in the objects to
 * filter.
 * @param {FilterOptions} [options={}] - The filter options to use.
 * @returns {Result<(object_: Object_) => boolean, Error>} - Returns a Result
 * containing either a filter function or an Error for invalid date ranges.
 *
 * @example
 * ```typescript
 * // Filter an array of objects by a year
 * import { assertEquals } from '@std/assert'
 *
 * const dates = [{ date: new Date(2020, 0, 1) }, { date: new Date(2021, 0, 1) }]
 * const result = filterByDate({array:dates, keyOrFunction: 'date', options: { year: 2020 }})
 *
 * assertEquals(result.error, undefined)
 * assertEquals(result.data, [{ date: new Date(2020, 0, 1) }])
 * ```
 *
 * @example
 * ```typescript
 * // Filter an array of objects by a date range
 * import { assertEquals } from '@std/assert'
 *
 * const dates = [{ date: new Date(2020, 0, 1) }, { date: new Date(2021, 0, 1) }]
 * const result = filterByDate({array:dates, keyOrFunction: obj => obj.date, options: { startDate: new Date(2019, 6, 1), endDate: new Date(2020, 11, 31) }})
 *
 * assertEquals(result.error, undefined)
 * assertEquals(result.data, [{ date: new Date(2020, 0, 1) }])
 * ```
 *
 * @example
 * ```typescript
 * // Filter by duration from a reference date
 * import { assertEquals } from '@std/assert'
 *
 * const dates = [{ date: new Date(2020, 0, 1) }, { date: new Date(2021, 0, 1) }]
 * const result = filterByDate({array:dates, keyOrFunction: 'date', options: { referenceDate: new Date(2020, 4, 1), durationInMS: 1000 * 60 * 60 * 24 * 180 }}) // 180 days
 *
 * assertEquals(result.error, undefined)
 * assertEquals(result.data, [{ date: new Date(2020, 0, 1) }])
 * ```
 */
export function filterByDate<Object_ extends ObjectOfType<unknown>>(
  { array, options, keyOrFunction = 'date' }: FilterByDateParams<Object_>,
): Result<Object_[], Error> {
  if (
    isDateInRangeOption(options) &&
    !isValidDate(options.startDate, options.endDate)
  ) {
    return err(new Error('Invalid date range'))
  }

  if (size(options) === 0) return ok(array)

  const filteredArrayByDate = array.filter((o) => {
    const dateValue = typeof keyOrFunction === 'function'
      ? keyOrFunction(o)
      : o[keyOrFunction]

    if (!isDateCompatible(dateValue)) {
      return false
    }

    const date = new Date(dateValue)
    if (!isValidDate(date)) {
      return false
    }

    if (isYearOption(options)) return isDateInYear(date, options.year)

    if (isDateInRangeOption(options)) {
      return isDateInRange(date, options)
    }

    return isDateInDuration(date, options)
  })

  return ok(
    filteredArrayByDate,
  )
}

/**
 * The filter options for the {@link filterByDate} function.
 * This can be a year, a start and end date, or a duration from a reference date.
 */
export type FilterOptions =
  | YearOption
  | StartAndEndDate
  | DurationAndReferenceDate

/** Parameters for the {@link filterByDate} function. */
export type FilterByDateParams<Object_ extends ObjectOfType<unknown>> = {
  /** The array of objects to filter. */
  array: Object_[]
  /** The filter options to use @see {@link FilterOptions}. */
  options: FilterOptions
  /** The object's key representing the date field or function to use to extract
   * the date from each object.
   */
  keyOrFunction: ((o: Object_) => Date) | keyof Object_
}
