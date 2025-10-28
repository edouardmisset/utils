import type { ObjectOfType } from '@edouardmisset/type'

/**
 * Returns the **last** object with the minimum value for the specified key from an array of objects.
 * If the array is empty, returns undefined.
 *
 * @template Object_ - The type of the objects in the array. Must extend ObjectOfType<unknown>.
 * @param {Object_[]} array - The array of objects to search.
 * @param {keyof Object_} key - The key to compare.
 * @returns {Object_ | undefined} - The object with the minimum value for the specified key, or undefined if the array is empty.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Find object with minimum value
 * const array = [{ id: 1, value: 10 }, { id: 2, value: 5 }, { id: 3, value: 20 }]
 * assertEquals(minBy(array, 'value'), { id: 2, value: 5 })
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Empty array returns undefined
 * assertEquals(minBy([], 'value'), undefined)
 * ```
 */
export function minBy<Object_ extends ObjectOfType<unknown>>(
  array: Object_[],
  key: keyof Object_,
): Object_ | undefined {
  return array.length === 0 ? undefined : array.reduce(
    (
      currentMin,
      candidate,
    ) => (currentMin[key] < candidate[key] ? currentMin : candidate),
    array[0],
  )
}
