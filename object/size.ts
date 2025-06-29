/**
 * Returns the size of a collection, which can be:
 * - For objects: the number of own enumerable properties
 * - For arrays and strings: the length
 * - For Maps and Sets: the size
 *
 * @template T - The type of elements in the collection.
 * @param {Record<string, T> | Array<T> | Map<string, T> | Set<T> | string} o - The collection to query.
 * @returns {number} Returns the size of the collection.
 *
 * @example
 * ```typescript
 * // Objects
 * size({a: 1, b: 2, c: 3})
 * // returns 3
 *
 * // Arrays
 * size([1, 2, 3, 4])
 * // returns 4
 *
 * // Strings
 * size('hello')
 * // returns 5
 *
 * // Maps
 * const map = new Map([['a', 1], ['b', 2]])
 * size(map)
 * // returns 2
 *
 * // Sets
 * const set = new Set([1, 2, 3])
 * size(set)
 * // returns 3
 * ```
 */

import type { ObjectOfType } from '@edouardmisset/type'

export function size<T = unknown>(
  o: ObjectOfType<T> | Array<T> | Map<string, T> | Set<T> | string,
): number {
  if (o instanceof Map || o instanceof Set) return o.size
  if (Array.isArray(o) || typeof o === 'string') return o.length
  return Object.keys(o).length
}

/**
 * Alias for the {@link size} function.
 */
export const length: typeof size = size
