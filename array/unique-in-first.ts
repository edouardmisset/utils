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
 * const array2 = [2, 4]
 * const array3 = [3, 5]
 * const result = uniqueInFirst(array1, array2, array3) // [1]
 * ```
 */
export function uniqueInFirst<T>(
  firstArray: T[] | readonly T[],
  ...otherArrays: (T[] | readonly T[])[]
): T[] {
  return firstArray.filter(
    (item) => !otherArrays.some((array) => new Set(array).has(item)),
  )
}
