/**
 * Returns the elements that are common to both arrays.
 *
 * @deprecated Deprecated and scheduled for removal in v6, native Set operations should be preferred.
 *
 * Migration (native):
 * ```typescript
 * const result = [...new Set(leftArray).intersection(new Set(rightArray))]
 * ```
 *
 * API availability:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/intersection#browser_compatibility
 *
 * @template T The type of the elements in the arrays.
 * @param {T[]} leftArray The first array.
 * @param {T[]} rightArray The second array.
 * @returns {T[]} An array that contains all elements that are in both arrays.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const array1 = [1, 2, 3]
 * const array2 = [2, 3, 4]
 * assertEquals(commonElements(array1, array2), [2, 3])
 * ```
 */
export function commonElements<T>(
  leftArray: T[] | readonly T[],
  rightArray: T[] | readonly T[],
): T[] {
  const rightArraySet = new Set(rightArray)
  return leftArray.filter((item) => {
    return rightArraySet.has(item)
  })
}

/**
 * Alias for the {@link commonElements} function.
 *
 * @deprecated Deprecated and scheduled for removal in v6. Use
 * `Set.prototype.intersection()`.
 *
 * Migration (native):
 * ```typescript
 * const result = [...new Set(leftArray).intersection(new Set(rightArray))]
 * ```
 *
 * API availability:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/intersection#browser_compatibility
 */
export const intersection: typeof commonElements = commonElements
