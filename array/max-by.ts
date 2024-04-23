/**
 * Returns the **last**  object with the maximum value for the specified key from an array of objects.
 * If the array is empty, returns undefined.
 *
 * @template Obj - The type of the objects in the array. Must extend Record<string, unknown>.
 * @param {Obj[]} array - The array of objects to search.
 * @param {keyof Obj} key - The key to compare.
 * @returns {Obj | undefined} - The object with the maximum value for the specified key, or undefined if the array is empty.
 *
 * @example
 * ```typescript
 * const array = [{ id: 1, value: 10 }, { id: 2, value: 5 }, { id: 3, value: 20 }]
 * const key = 'value'
 * maxBy(array, key)
 * // returns { id: 3, value: 20 }
 * ```
 *
 * @example
 * ```typescript
 * const emptyArray = []
 * const key = 'value'
 * maxBy(emptyArray, key)
 * // returns undefined
 * ```
 */
export function maxBy<Obj extends Record<string, unknown>>(
  array: Obj[],
  key: keyof Obj,
): Obj | undefined {
  return array.length === 0
    ? undefined
    : array.reduce((acc, val) => (acc[key] > val[key] ? acc : val), array[0])
}
