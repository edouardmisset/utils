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
  return array.length === 0 ? undefined : (Object.fromEntries(
    array.map((value) => [String(value[key] ?? value), value]),
  ) as ObjectOfType<Object_>)
}

/**
 * Transforms a collection (either an array or an object) of objects into an
 * object where the keys are the values of a specified key in the objects, and
 * the values are the objects themselves. If the collection is empty, returns
 * undefined.
 *
 * @template Object_ - The type of the objects in the collection. Must extend
 * Record<string, unknown>.
 * @template Key - The type of the key to use. Must be a key of Object_.
 * @param {Object_[] | ObjectOfType<Object_>} collection - The collection of objects
 * to transform.
 * @param {Key} key - The key to use for the new object.
 * @returns {undefined | ObjectOfType<Object_>} - The transformed object, or
 * undefined if the collection is empty.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const array = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
 * assertEquals(collectionKeyBy(array, 'id'), { '1': { id: 1, name: 'Alice' }, '2': { id: 2, name: 'Bob' }, '3': { id: 3, name: 'Charlie' } })
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const object = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' }, c: { id: 3, name: 'Charlie' } }
 * const key = 'id'
 * assertEquals(collectionKeyBy(object, key), { '1': { id: 1, name: 'Alice' }, '2': { id: 2, name: 'Bob' }, '3': { id: 3, name: 'Charlie' } })
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const key = 'id'
 * assertEquals(collectionKeyBy([], key), undefined)
 * ```
 */
export function collectionKeyBy<
  Object_ extends ObjectOfType<unknown>,
  Key extends keyof Object_,
>(
  collection: Object_[] | ObjectOfType<Object_>,
  key: Key,
): ObjectOfType<Object_> | undefined {
  return Array.isArray(collection)
    ? keyBy(collection, key)
    : keyBy(Object.values(collection), key)
}

/**
 * Alias for the {@link collectionKeyBy} function
 */
export const normalizeBy: typeof collectionKeyBy = collectionKeyBy
