import type { ObjectOfType } from '@edouardmisset/type'

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
 * import { assertEquals } from '@std/assert'
 *
 * // Different collection types
 * assertEquals(size({a: 1, b: 2, c: 3}), 3) // Objects
 * assertEquals(size([1, 2, 3, 4]), 4) // Arrays
 * assertEquals(size('hello'), 5) // Strings
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Maps and Sets
 * const map = new Map([['a', 1], ['b', 2]])
 * assertEquals(size(map), 2)
 *
 * const set = new Set([1, 2, 3])
 * assertEquals(size(set), 3)
 * ```
 */
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
