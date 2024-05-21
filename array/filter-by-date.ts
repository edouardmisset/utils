import { objectSize } from '../mod.ts'
import { oneYearInMilliseconds } from './mod.ts'

/**
 * Type is a number representing the duration in milliseconds.
 */
export type milliseconds = number

/**
 * Type is a number representing an integer.
 */
export type integer = number

/**
 * Type representing a start and end date (as `Date` types).
 */
export type StartAndEndDate = {
  endDate?: Date
  startDate: Date
}

/**
 * Type representing a year as an integer (number).
 */
export type Year = {
  year: integer
}

/**
 * Type representing a duration (in milliseconds) and a reference date (as
 * `Date` type).
 */
export type DurationAndReferenceDate = {
  durationInMS?: milliseconds
  referenceDate?: Date
}

/**
 * The filter options for the {@link filterByDate} function.
 * This can be a year, a start and end date, or a duration from a reference date.
 */
export type FilterOptions = Year | StartAndEndDate | DurationAndReferenceDate

/**
 * Checks if the given option is of type Year.
 *
 * @param {FilterOptions} option - The option to check.
 * @returns {boolean} - True if the option is of type Year, false otherwise.
 */
export function isYearOption(option: FilterOptions): option is Year {
  return (option as Year)?.year !== undefined
}

/**
 * Checks if the given option is of type StartAndEndDate.
 *
 * @param {FilterOptions} option - The option to check.
 * @returns {boolean} - True if the option is of type StartAndEndDate, false
 * otherwise.
 */
export function isDateRangeOption(
  option: FilterOptions,
): option is StartAndEndDate {
  return (option as StartAndEndDate)?.startDate !== undefined &&
    (option as StartAndEndDate)?.endDate !== undefined
}

/**
 * Checks if the given dates are valid.
 *
 * @param {...unknown[]} dates - The dates to check.
 * @returns {boolean} - True if all dates are valid, false otherwise.
 */
export function isValidDate(...dates: unknown[]): boolean {
  for (const date of dates) {
    if (
      !(date instanceof Date) || Number.isNaN(date) ||
      date.toString() === 'Invalid Date'
    ) return false
  }

  return true
}

/**
 * Checks if the given date matches the given year.
 *
 * @param {Date} dateValue - The date to check.
 * @param {number} year - The year to match.
 * @returns {boolean} - True if the date matches the year, false otherwise.
 */
function isYearMatch(dateValue: Date, year: number): boolean {
  return dateValue.getFullYear() === year
}

/**
 * Checks if the given date is within the given start and end dates (inclusive).
 *
 * @param {Date} dateValue - The date to check.
 * @param {Date} startDate - The start date of the range.
 * @param {Date} endDate - The end date of the range.
 * @returns {boolean} - True if the date is within the range, false otherwise.
 */
function isWithinDateRange(
  dateValue: Date,
  startDate: Date,
  endDate: Date,
): boolean {
  return startDate <= dateValue && dateValue <= endDate
}

/**
 * Checks if the given date is within the duration from the reference date
 * (inclusive).
 *
 * @param {Date} dateValue - The date to check.
 * @param {Date} referenceDate - The reference date.
 * @param {number} durationInMS - The duration from the reference date.
 * @returns {boolean} - True if the date is within the duration, false
 * otherwise.
 */
function isWithinDuration(
  dateValue: Date,
  referenceDate: Date,
  durationInMS: number,
): boolean {
  const refTime = referenceDate.getTime()
  const valueTime = dateValue.getTime()
  return refTime - durationInMS <= valueTime && valueTime <= refTime
}

/**
 * Checks if the given value is compatible with Date.
 *
 * @param {unknown} val - The value to check.
 * @returns {boolean} - True if the value is compatible with Date, false otherwise.
 */
function isDateCompatible(val: unknown): val is Date | number | string {
  return typeof val === 'string' || val instanceof Date ||
    typeof val === 'number'
}

/**
 * Creates a filter function that can be used to filter an array of objects
 * based on a date property and provided filter options.
 *
 * @template Object_ - The type of object in the array to filter.
 * @param {keyof Object_} dateKey - The key of the date property in the objects to
 * filter.
 * @param {FilterOptions} [options={}] - The filter options to use.
 * @returns {(object: Object_) => boolean} - A filter function that takes an object and
 * returns true if the object passes the filter, false otherwise.
 *
 * @example
 * ```typescript
 * // Filter an array of objects by a year
 * const data = [{ date: new Date(2020, 0, 1) }, { date: new Date(2021, 0, 1) }]
 * const filter = createFilter('date', { year: 2020 })
 * const result = data.filter(filter)
 * // [{ date: new Date(2020, 0, 1) }]
 * ```
 *
 * @example
 * ```typescript
 * // Filter an array of objects by a date range
 * const data = [{ date: new Date(2020, 0, 1) }, { date: new Date(2021, 0, 1) }]
 * const filter = createFilter('date', { startDate: new Date(2020, 6, 1), endDate: new Date(2020, 11, 31) })
 * const result = data.filter(filter)
 * // []
 * ```
 *
 * @example
 * ```typescript
 * // Filter an array of objects by a duration from a reference date
 * const data = [{ date: new Date(2020, 0, 1) }, { date: new Date(2021, 0, 1) }]
 * const filter = createFilter('date', { referenceDate: new Date(2020, 6, 1), duration: 1000 * 60 * 60 * 24 * 180 }) // 180 days
 * const result = data.filter(filter)
 * // [{ date: new Date(2020, 0, 1) }]
 * ```
 */
export function filterByDate<Object_ extends Record<string, unknown>>(
  dateKey: keyof Object_ = 'date',
  options: FilterOptions = {} as FilterOptions,
): (object: Object_) => boolean {
  return (object: Object_) => {
    if (objectSize(options) === 0) return true

    const val = object[dateKey]
    if (!isDateCompatible(val)) return true

    const dateValue = new Date(val)
    if (!isValidDate(dateValue)) return true

    if (isYearOption(options)) return isYearMatch(dateValue, options.year)

    if (
      isDateRangeOption(options)
    ) {
      if (!isValidDate(options.startDate, options.endDate)) {
        throw new Error('Invalid date range')
      }
      return isWithinDateRange(
        dateValue,
        options.startDate,
        options.endDate ?? new Date(),
      )
    }

    return isWithinDuration(
      dateValue,
      options.referenceDate ?? new Date(),
      options.durationInMS ?? oneYearInMilliseconds,
    )
  }
}

/**
 * Alias for the {@link createDateFilter} function.
 */
export const filterByDateKey: typeof filterByDate = filterByDate
