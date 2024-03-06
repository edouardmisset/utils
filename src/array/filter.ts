/**
 * Creates a date filter function that can be used to filter dates based on provided parameters.
 *
 * @param {Object} params - The parameters to use for the filter. Can be one of the following forms:
 *   - { startDate: Date; endDate: Date }
 *   - { referenceDate?: Date; durationInMilliseconds?: number }
 *   - { year: number }
 *   - undefined
 * @returns {(date: Date) => boolean} - A filter function that takes a date and returns true if the date passes the filter, false otherwise.
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
export function createDateFilter(params:
  | { startDate: Date; endDate: Date }
  | { referenceDate?: Date; durationInMilliseconds?: number }
  | { year: number }
  | undefined = {}): (date: Date) => boolean {
  const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000

  if ('year' in params) {
    return (date) => date.getFullYear() === params.year
  }

  if ('startDate' in params && 'endDate' in params) {
    return (date) =>
      date.getTime() >= params.startDate.getTime() &&
      date.getTime() <= params.endDate.getTime()
  }

  const {
    referenceDate = new Date(),
    durationInMilliseconds = oneYearInMilliseconds,
  } = params

  return (date) =>
    date.getTime() >= referenceDate.getTime() - durationInMilliseconds
}

/**
 * Creates a boolean filter function.
 * The filter function expects an object and checks if the specified key's value is true.
 *
 * @template Obj - The type of the object.
 * @template Key - The type of the key of the object.
 * @param {Key} key - The key of the property to check in the value object.
 * @returns {(value: Obj) => boolean} The filter function.
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
>(key: Key): (value: Obj) => boolean {
  return (value: Obj): boolean =>
    typeof value?.[key] === 'boolean' ? value[key] === true : false
}
