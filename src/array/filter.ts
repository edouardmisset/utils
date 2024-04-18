import { FilterOptions, isDateRangeOption, isYearOption } from './mod.ts'

/** 
 * The number of milliseconds in a year.
 */
export const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000

/**
 * Creates a date filter function that can be used to filter dates based on provided parameters.
 *
 * @param {FilterOptions} options - The parameters to use for the filter.
 * @returns {(date: Date) => boolean} - A filter function that takes a date and
 * returns true if the date passes the filter, false otherwise.
 *
 * @example
 * ```typescript
 * // Filter dates by a specific year
 * const filter = createDateFilter({ year: 2020 })
 * const result = filter(new Date(2020, 0, 1)) // true
 * ```
 *
 * @example
 * ```typescript
 * // Filter dates by a date range
 * const filter = createDateFilter({ startDate: new Date(2020, 6, 1), endDate: new Date(2020, 11, 31) })
 * const result = filter(new Date(2020, 0, 1)) // false
 * ```
 *
 * @example
 * ```typescript
 * // Filter dates by a duration from a reference date
 * const filter = createDateFilter({ referenceDate: new Date(2020, 6, 1), durationInMilliseconds: 1000 * 60 * 60 * 24 * 180 }) // 180 days
 * const result = filter(new Date(2020, 0, 1)) // true
 * ```
 */
export function createDateFilter(
  options: FilterOptions = ({} as FilterOptions),
): (date: Date) => boolean {
  if (isYearOption(options)) {
    return (date) => date.getFullYear() === options.year
  }

  if (isDateRangeOption(options)) {
    return (date) =>
      date.getTime() >= options.startDate.getTime() &&
      date.getTime() <= (options?.endDate ?? new Date()).getTime()
  }

  const {
    referenceDate = new Date(),
    durationInMS = oneYearInMilliseconds,
  } = options

  return (date) => date.getTime() >= referenceDate.getTime() - durationInMS
}

/**
 * Alias for the {@link createDateFilter} function.
 */
export const buildDateFilter: typeof createDateFilter = createDateFilter

/**
 * Creates a boolean filter function.
 * The filter function expects an object and checks if the specified key's value is true.
 *
 * @template Obj - The type of the object.
 * @template Key - The type of the key of the object.
 * @param {Key} key - The key of the property to check in the object.
 * @returns {(obj: Obj) => boolean} The filter function.
 *
 * @example
 * ```typescript
 * const filterByKey = createBooleanFilter('key')
 * filterByKey({ key: true }) // true
 * filterByKey({ key: false }) // false
 * filterByKey({ key: 'string' }) // false
 * ```
 */
export function createBooleanFilter<
  Obj extends Record<string, unknown>,
  Key extends keyof Obj,
>(key: Key): (obj: Obj) => boolean {
  return (obj: Obj): boolean =>
    typeof obj?.[key] === 'boolean' ? obj[key] === true : false
}
