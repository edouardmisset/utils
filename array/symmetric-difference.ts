/**
 * Returns elements that appear in exactly one of the provided arrays.
 *
 * @deprecated Deprecated and scheduled for removal in v6, native Set operations should be preferred.
 *
 * Migration (native):
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const set1 = new Set([1, 2, 3])
 * const set2 = new Set([2, 3, 4])
 *
 * const result = [...set1.symmetricDifference(set2)]
 * assertEquals(result, [1, 4])
 * ```
 *
 * API availability:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/symmetricDifference#browser_compatibility
 *
 * @template T The type of the elements in the arrays.
 * @param {...T[][]} arrays The arrays to find the symmetric difference of.
 * @returns {T[]} An array containing all elements that appear in exactly one of the input arrays.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const array1 = [1, 2, 3]
 * const array2 = [2, 3, 4]
 * const array3 = [3, 4, 5]
 * assertEquals(symmetricDifference(array1, array2, array3), [1, 5])
 * ```
 */
export function symmetricDifference<T>(...arrays: (T[] | readonly T[])[]): T[] {
  const counts = new Map<T, number>()
  for (const array of arrays) {
    for (const value of array) {
      counts.set(value, (counts.get(value) ?? 0) + 1)
    }
  }

  const result: T[] = []
  for (const [value, count] of counts) {
    if (count === 1) result.push(value)
  }
  return result
}
