/**
 * Returns the elements that are unique to the first array.
 *
 * @deprecated Deprecated and scheduled for removal in v6, native Set operations should be preferred.
 *
 * Migration (native):
 * ```typescript
 * import { assertEquals } from '@std/assert'
 * 
 * const otherArray = [1, 2, 3, 4, 5]
 * const otherValues = new Set(otherArray)
 * const result = [...new Set([0, 1, 2]).difference(otherValues)]
 * assertEquals(result, [0])
 * ```
 *
 * API availability:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/difference#browser_compatibility
 *
 * @template T The type of the elements in the arrays.
 * @param {T[]} firstArray The first array.
 * @param {...T[][]} otherArrays The other arrays.
 * @returns {T[]} An array that contains all elements that are in the first array but not in any of the other arrays.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const array1 = [1, 2, 3]
 * const array2 = [2, 4]
 * const array3 = [3, 5]
 * assertEquals(uniqueInFirst(array1, array2, array3), [1])
 * ```
 */
export function uniqueInFirst<T>(
  firstArray: T[] | readonly T[],
  ...otherArrays: (T[] | readonly T[])[]
): T[] {
  const sets = otherArrays.map((array) => new Set(array))
  return firstArray.filter(
    (item) => !sets.some((set) => set.has(item)),
  )
}
