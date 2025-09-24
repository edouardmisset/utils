/**
 * Returns the elements that are common to both arrays.
 *
 * @template T The type of the elements in the arrays.
 * @param {T[]} leftArray The first array.
 * @param {T[]} rightArray The second array.
 * @returns {T[]} An array that contains all elements that are in both arrays.
 *
 * @example
 * ```typescript
 * const array1 = [1, 2, 3]
 * const array2 = [2, 3, 4]
 * const result = commonElements(array1, array2) // [2, 3]
 * ```
 */
export function commonElements<T>(
  leftArray: T[] | readonly T[],
  rightArray: T[] | readonly T[],
): T[] {
  return leftArray.filter((item) => new Set(rightArray).has(item))
}

/**
 * Alias for the {@link commonElements} function.
 */
export const intersection: typeof commonElements = commonElements