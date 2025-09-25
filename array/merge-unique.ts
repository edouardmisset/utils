/**
 * Returns the unique elements from the combination of two arrays.
 *
 * @template T The type of the elements in the arrays.
 * @param {T[]} leftArray The first array.
 * @param {T[]} rightArray The second array.
 * @returns {T[]} An array that contains all unique elements from both arrays.
 *
 * @example
 * ```typescript
 * const array1 = [1, 2, 3]
 * const array2 = [2, 3, 4]
 * const result = mergeUnique(array1, array2) // [1, 2, 3, 4]
 * ```
 */
export function mergeUnique<T>(
  leftArray: T[] | readonly T[],
  rightArray: T[] | readonly T[],
): T[] {
  return Array.from(new Set([...leftArray, ...rightArray]))
}

/**
 * Alias for the {@link mergeUnique} function.
 */
export const union: typeof mergeUnique = mergeUnique
