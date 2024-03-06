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
export function commonElements<T>(leftArray: T[], rightArray: T[]): T[] {
  return leftArray.filter((item) => new Set(rightArray).has(item))
}

/**
 * Alias for the {@link commonElements} function.
 */
export const intersection = commonElements

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
export function mergeUnique<T>(leftArray: T[], rightArray: T[]): T[] {
  return Array.from(new Set([...leftArray, ...rightArray]))
}

/**
 * Alias for the {@link mergeUnique} function.
 */
export const union = mergeUnique

/**
 * Returns the elements that are unique to the first array.
 *
 * @template T The type of the elements in the arrays.
 * @param {T[]} firstArray The first array.
 * @param {...T[][]} otherArrays The other arrays.
 * @returns {T[]} An array that contains all elements that are in the first array but not in any of the other arrays.
 *
 * @example
 * ```typescript
 * const array1 = [1, 2, 3]
 * const array2 = [2, 3, 4]
 * const array3 = [3, 4, 5]
 * const result = uniqueInFirst(array1, array2, array3) // [1]
 * ```
 */
export function uniqueInFirst<T>(firstArray: T[], ...otherArrays: T[][]): T[] {
  return firstArray.filter(
    (item) => !otherArrays.some((array) => new Set(array).has(item)),
  )
}

/**
 * Alias for the {@link uniqueInFirst} function.
 */
export const setDifference = uniqueInFirst

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
export function uniqueElements<T>(...arrays: T[][]): T[] {
  const counts = new Map<T, number>()
  arrays.flat().forEach((value) => {
    counts.set(value, (counts.get(value) || 0) + 1)
  })

  return [...counts.entries()]
    .filter(([, count]) => count === 1)
    .map(([value]) => value)
}

/**
 * Alias for the {@link uniqueElements} function.
 */
export const symmetricDifference = uniqueElements
