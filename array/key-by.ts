import type { ObjectOfType } from '@edouardmisset/type'

/**
 * Transforms an array of objects into an object where the keys are the values
 * of a specified key in the objects, and the values are the objects themselves.
 * If the array is empty, returns undefined.
 *
 * @template Object_ - The type of the objects in the array. Must extend
 * Record<string, unknown>.
 * @template Key - The type of the key to use. Must be a key of Object_.
 * @param {Object_[]} array - The array of objects to transform.
 * @param {Key} key - The key to use for the new object.
 * @returns {undefined | ObjectOfType<Object_>} - The transformed object, or
 * undefined if the array is empty.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const array = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
 *  assertEquals(keyBy(array, 'id'), { '1': { id: 1, name: 'Alice' }, '2': { id: 2, name: 'Bob' }, '3': { id: 3, name: 'Charlie' } })
 *
 * assertEquals(keyBy([], 'id'), undefined)
 * ```
 */
export function keyBy<
  Object_ extends Record<string, unknown>,
  Key extends keyof Object_,
>(array: Object_[], key: Key): undefined | ObjectOfType<Object_> {
  return array.length === 0
    ? undefined
    : (Object.fromEntries(
      array
        .filter((value) => value[key] !== undefined && value[key] !== null)
        .map((value) => [String(value[key]), value]),
    ) as ObjectOfType<Object_>)
}
