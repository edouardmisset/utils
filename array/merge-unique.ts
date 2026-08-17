/**
 * Returns the unique elements from the combination of two arrays.
 *
 * @deprecated Deprecated and scheduled for removal in v6, native Set operations should be preferred.
 *
 * Migration (native):
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const array1 = [1, 2, 3]
 * const array2 = [2, 3, 4]
 * const result = [...new Set(array1).union(new Set(array2))]
 * assertEquals(result, [1, 2, 3, 4])
 * ```
 *
 * API availability:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/union#browser_compatibility
 *
 * @template T The type of the elements in the arrays.
 * @param {T[]} leftArray The first array.
 * @param {T[]} rightArray The second array.
 * @returns {T[]} An array that contains all unique elements from both arrays.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const array1 = [1, 2, 3]
 * const array2 = [2, 3, 4]
 * assertEquals(mergeUnique(array1, array2), [1, 2, 3, 4])
 * ```
 */
export function mergeUnique<T>(
  leftArray: T[] | readonly T[],
  rightArray: T[] | readonly T[],
): T[] {
  const set = new Set(leftArray)
  for (const v of rightArray) set.add(v)
  return Array.from(set)
}

/**
 * Alias for the {@link mergeUnique} function.
 *
 * @deprecated Deprecated and scheduled for removal in v6. Use
 * `Set.prototype.union()`.
 *
 * Migration (native):
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const array1 = [1, 2, 3]
 * const array2 = [2, 3, 4]
 * const result = [...new Set(array1).union(new Set(array2))]
 * assertEquals(result, [1, 2, 3, 4])
 * ```
 *
 * API availability:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/union#browser_compatibility
 */
export const union: typeof mergeUnique = mergeUnique
