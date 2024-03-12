/**
 * Transforms an array of objects into an object where the keys are the values
 * of a specified key in the objects, and the values are the objects themselves.
 * If the array is empty, returns undefined.
 *
 * @template Obj - The type of the objects in the array. Must extend
 * Record<string, unknown>.
 * @template Key - The type of the key to use. Must be a key of Obj.
 * @param {Obj[]} array - The array of objects to transform.
 * @param {Key} key - The key to use for the new object.
 * @returns {undefined | Record<string, Obj>} - The transformed object, or
 * undefined if the array is empty.
 *
 * @example
 * ```typescript
 * const array = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
 * const key = 'id'
 * keyBy(array, key)
 * // returns { '1': { id: 1, name: 'Alice' }, '2': { id: 2, name: 'Bob' }, '3': { id: 3, name: 'Charlie' } }
 * ```
 *
 * @example
 * ```typescript
 * const emptyArray = []
 * const key = 'id'
 * keyBy(emptyArray, key)
 * // returns undefined
 * ```
 */
export function keyBy<
  Obj extends Record<string, unknown>,
  Key extends keyof Obj,
>(array: Obj[], key: Key): undefined | Record<string, Obj> {
  return array.length === 0 ? undefined : (Object.fromEntries(
    array.map((value) => [String(key ? value[key] : value), value]),
  ) as Record<string, Obj>)
}

/**
 * Transforms a collection (either an array or an object) of objects into an
 * object where the keys are the values of a specified key in the objects, and
 * the values are the objects themselves. If the collection is empty, returns
 * undefined.
 *
 * @template Obj - The type of the objects in the collection. Must extend
 * Record<string, unknown>.
 * @template Key - The type of the key to use. Must be a key of Obj.
 * @param {Obj[] | Record<string, Obj>} collection - The collection of objects
 * to transform.
 * @param {Key} key - The key to use for the new object.
 * @returns {undefined | Record<string, Obj>} - The transformed object, or
 * undefined if the collection is empty.
 *
 * @example
 * ```typescript
 * const array = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
 * const key = 'id'
 * collectionKeyBy(array, key)
 * // returns { '1': { id: 1, name: 'Alice' }, '2': { id: 2, name: 'Bob' }, '3': { id: 3, name: 'Charlie' } }
 * ```
 *
 * @example
 * ```typescript
 * const object = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' }, c: { id: 3, name: 'Charlie' } }
 * const key = 'id'
 * collectionKeyBy(object, key)
 * // returns { '1': { id: 1, name: 'Alice' }, '2': { id: 2, name: 'Bob' }, '3': { id: 3, name: 'Charlie' } }
 * ```
 *
 * @example
 * ```typescript
 * const emptyArray = []
 * const key = 'id'
 * collectionKeyBy(emptyArray, key)
 * // returns undefined
 * ```
 */
export function collectionKeyBy<
  Obj extends Record<string, unknown>,
  Key extends keyof Obj,
>(
  collection: Obj[] | Record<string, Obj>,
  key: Key,
): Record<string, Obj> | undefined {
  return Array.isArray(collection)
    ? keyBy(collection, key)
    : keyBy(Object.values(collection), key)
}

/**
 * Alias for the {@link collectionKeyBy} function
 */
export const normalizeBy: typeof collectionKeyBy = collectionKeyBy
