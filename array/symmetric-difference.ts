/**
 * Returns elements that appear in exactly one of the provided arrays.
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
