/**
 * Returns elements that appear in exactly one of the provided arrays.
 *
 * @deprecated Deprecated and scheduled for removal in v6, native Set operations should be preferred.
 *
 * Migration (native):
 * ```typescript
 * import { assertEquals } from '@std/assert'
 * 
 * function nativeSymmetricDifference<T>(...arrays: (T[] | readonly T[])[]): T[] {
 *   return [
 *     ...arrays
 *       .map((array) => new Set(array))
 *       .reduce(
 *         (accumulator, set_) => accumulator.symmetricDifference(set_),
 *         new Set<T>(),
 *       ),
 *   ]
 * }
 * const array1 = [1, 2, 3]
 * const array2 = [2, 3, 4]
 * const array3 = [3, 4, 5]
 * const result = nativeSymmetricDifference(array1, array2, array3)
 * assertEquals(result, [1, 5])
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
  arrays.flat().forEach((value) => {
    counts.set(value, (counts.get(value) ?? 0) + 1)
  })

  return [...counts.entries()]
    .filter(([, count]) => count === 1)
    .map(([value]) => value)
}
