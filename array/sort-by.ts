/**
 * Sorts an array of objects by a specified property in ascending or descending
 * order.
 *
 * @template Object_ - A type that extends Record<string, unknown>.
 * @param {Object_[]} array - The array to sort.
 * @param {keyof Object_} property - The property to sort by.
 * @param {boolean} [ascending=true] - Whether to sort in ascending order. If
 * false, sorts in descending order.
 * @returns {Object_[]} - The sorted array.
 *
 * @example
 * ```typescript
 * const array = [{ id: 1, value: 10 }, { id: 2, value: 5 }, { id: 3, value: 20 }]
 * const property = 'value'
 * sortBy(array, property)
 * // returns [{ id: 2, value: 5 }, { id: 1, value: 10 }, { id: 3, value: 20 }]
 * ```
 *
 * @example
 * ```typescript
 * const array = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]
 * const property = 'age'
 * sortBy(array, property, false)
 * // returns [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]
 * ```
 */
export function sortBy<Object_ extends Record<string, unknown>>(
  array: Object_[],
  property: keyof Object_,
  ascending = true,
): Object_[] {
  return [...array].sort((left, right) => {
    const leftValue = left[property]
    const rightValue = right[property]
    const order = ascending ? 1 : -1

    if (typeof leftValue === 'string' && typeof rightValue === 'string') {
      return leftValue.localeCompare(rightValue) * order
    }

    if (typeof leftValue === 'number' && typeof rightValue === 'number') {
      return (leftValue - rightValue) * order
    }
    return 0
  })
}

/**
 * Alias for the {@link sortBy} function.
 */
export const orderBy: typeof sortBy = sortBy
