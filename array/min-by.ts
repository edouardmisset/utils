/**
 * Returns the **last** object with the minimum value for the specified key from an array of objects.
 * If the array is empty, returns undefined.
 *
 * @template Object_ - The type of the objects in the array. Must extend Record<string, unknown>.
 * @param {Object_[]} array - The array of objects to search.
 * @param {keyof Object_} key - The key to compare.
 * @returns {Object_ | undefined} - The object with the minimum value for the specified key, or undefined if the array is empty.
 *
 * @example
 * ```typescript
 * const array = [{ id: 1, value: 10 }, { id: 2, value: 5 }, { id: 3, value: 20 }]
 * const key = 'value'
 * minBy(array, key)
 * // returns { id: 2, value: 5 }
 * ```
 *
 * @example
 * ```typescript
 * const emptyArray = []
 * minBy(emptyArray, 'value')
 * // returns undefined
 * ```
 */
export function minBy<Object_ extends Record<string, unknown>>(
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
