type milliseconds = number
type integer = number

type StartAndEndDate = {
  startDate: Date
  endDate: Date
}

type Year = {
  year: integer
}

type DurationAndRefDate = {
  referenceDate: Date
  duration: milliseconds
}

type FilterOptions = Year | StartAndEndDate | DurationAndRefDate

/**
 * Checks if the given option is of type Year.
 *
 * @param {FilterOptions} option - The option to check.
 * @returns {boolean} - True if the option is of type Year, false otherwise.
 */
function isYearOption(option: FilterOptions): option is Year {
  return 'year' in option
}

/**
 * Checks if the given option is of type StartAndEndDate.
 *
 * @param {FilterOptions} option - The option to check.
 * @returns {boolean} - True if the option is of type StartAndEndDate, false otherwise.
 */
function isDateRangeOption(option: FilterOptions): option is StartAndEndDate {
  return 'startDate' in option && 'endDate' in option
}

/**
 * Checks if the given option is of type DurationAndRefDate.
 *
 * @param {FilterOptions} option - The option to check.
 * @returns {boolean} - True if the option is of type DurationAndRefDate, false otherwise.
 */
function isReferenceDateOption(option: FilterOptions): option is DurationAndRefDate {
  return 'referenceDate' in option && 'duration' in option
}

/**
 * Checks if the given dates are valid.
 *
 * @param {...unknown[]} dates - The dates to check.
 * @returns {boolean} - True if all dates are valid, false otherwise.
 */
function isValidDate(...dates: unknown[]): boolean {
  for (const date of dates)
    if (!(date instanceof Date) || Number.isNaN(date)) return false

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
 * Checks if the given date is within the given start and end dates.
 *
 * @param {Date} dateValue - The date to check.
 * @param {Date} startDate - The start date of the range.
 * @param {Date} endDate - The end date of the range.
 * @returns {boolean} - True if the date is within the range, false otherwise.
 */
function isWithinDateRange(dateValue: Date, startDate: Date, endDate: Date): boolean {
  return startDate <= dateValue && dateValue <= endDate
}

/**
 * Checks if the given date is within the duration from the reference date.
 *
 * @param {Date} dateValue - The date to check.
 * @param {Date} referenceDate - The reference date.
 * @param {number} duration - The duration from the reference date.
 * @returns {boolean} - True if the date is within the duration, false otherwise.
 */
function isWithinDuration(dateValue: Date, referenceDate: Date, duration: number): boolean {
  const refTime = referenceDate.getTime()
  const valueTime = dateValue.getTime()
  return refTime - duration <= valueTime && valueTime <= refTime
}

/**
 * Checks if the given value is compatible with Date.
 *
 * @param {unknown} val - The value to check.
 * @returns {boolean} - True if the value is compatible with Date, false otherwise.
 */
function isDateCompatible(val: unknown): val is Date | number | string {
  return typeof val === 'string' || val instanceof Date || typeof val === 'number'
}

/**
 * Creates a filter function that can be used to filter an array of objects based on a date property and provided filter options.
 *
 * @template Obj - The type of object in the array to filter.
 * @param {keyof Obj} dateKey - The key of the date property in the objects to filter.
 * @param {FilterOptions} [options={}] - The filter options to use.
 * @returns {(obj: Obj) => boolean} - A filter function that takes an object and returns true if the object passes the filter, false otherwise.
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
export function createFilter<Obj>(dateKey: keyof Obj, options: FilterOptions = {} as FilterOptions): (obj: Obj) => boolean {
  return (obj: Obj): boolean => {
    const val = obj[dateKey]
    if (!isDateCompatible(val)) return true

    const dateValue = new Date(val)
    if (!isValidDate(dateValue)) return true

    if (isYearOption(options)) return isYearMatch(dateValue, options.year)

    if (
      isDateRangeOption(options) &&
      isValidDate(options.startDate, options.endDate)
    )
      return isWithinDateRange(dateValue, options.startDate, options.endDate)

    if (isReferenceDateOption(options) && isValidDate(options.referenceDate))
      return isWithinDuration(
        dateValue,
        options.referenceDate,
        options.duration,
      )

    // If no valid options are provided, include the item in the result
    return true
  }
}