/**
 * Returns the unique elements from n arrays.
 *
 * @template T The type of the elements in the arrays.
 * @param {...T[][]} arrays The arrays to find the unique elements of.
 * @returns {T[]} An array that contains all elements that are in exactly one of the input arrays.
 *
 * @example
 * ```typescript
 * const array1 = [1, 2, 3]
 * const array2 = [2, 3, 4]
 * const array3 = [3, 4, 5]
 * const result = uniqueElements(array1, array2, array3) // [1, 5]
 * ```
 */
export function uniqueElements<T>(...arrays: (T[] | readonly T[])[]): T[] {
  const counts = new Map<T, number>()
  arrays.flat().forEach((value) => {
    counts.set(value, (counts.get(value) ?? 0) + 1)
  })

  return [...counts.entries()]
    .filter(([, count]) => count === 1)
    .map(([value]) => value)
}

/**
 * Alias for the {@link uniqueElements} function.
 */
export const symmetricDifference: typeof uniqueElements = uniqueElements