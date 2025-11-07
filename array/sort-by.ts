import type { ObjectOfType } from '@edouardmisset/type'

const collator = new Intl.Collator(undefined, {
  numeric: true, // Better handling of numbers in strings
  sensitivity: 'base', // Case-insensitive sorting
})

/**
 * Sorts an array of objects by a specified property in ascending or descending
 * order.
 *
 * @template Object_ - A type that extends Record<string, string | number>.
 * @param {Object_[]} array - The array to sort.
 * @param {keyof Object_} property - The property to sort by.
 * @param {object} [options] - The sorting options.
 * @param {boolean} [options.descending=false] - Whether to sort in descending order.
 * @returns {Object_[]} - The new sorted array.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Sort by value ascending (default)
 * const array = [{ id: 1, value: 10 }, { id: 2, value: 5 }, { id: 3, value: 20 }]
 * const sorted = sortBy(array, 'value')
 * assertEquals(sorted, [{ id: 2, value: 5 }, { id: 1, value: 10 }, { id: 3, value: 20 }])
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Sort descending
 * const array = [{ id: 1, value: 10 }, { id: 2, value: 5 }, { id: 3, value: 20 }]
 * const sorted = sortBy(array, 'value', { descending: true })
 * assertEquals(sorted, [{ id: 3, value: 20 }, { id: 1, value: 10 }, { id: 2, value: 5 }])
 * ```
 */
export function sortBy<Object_ extends ObjectOfType<string | number>>(
  array: Object_[],
  property: keyof Object_,
  options?: { descending?: boolean },
): Object_[] {
  const { descending = false } = options ?? {}
  return [...array].sort((left, right) => {
    const leftValue = left[property]
    const rightValue = right[property]
    const order = descending ? -1 : 1

    if (typeof leftValue === 'string' && typeof rightValue === 'string') {
      return collator.compare(leftValue, rightValue) * order
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
