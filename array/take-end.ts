/**
 * Returns the last `n` elements from the given array.
 *
 * @template T - The type of the elements in the array.
 * @param {T[]} array - The array to take elements from.
 * @param {number} [n=1] - The number of elements to take. Defaults to 1 if not provided.
 * @returns {T[]} The last `n` elements from the given array.
 *
 * The `Math.abs(n)` is used to ensure that `n` is always positive. If a negative number is passed, it will be converted to a positive number.
 * This means that the function will always return the last `n` elements, even if `n` is negative.
 *
 * @example
 * ```typescript
 * takeEnd([1, 2, 3, 4])
 * // returns [4]
 * takeEnd([1, 2, 3, 4], 2)
 * // returns [3, 4]
 * takeEnd([1, 2, 3, 4], -2)
 * // returns [3, 4]
 * ```
 */
export function takeEnd<T>(array: T[], n = 1): T[] {
  return array.slice(-Math.abs(n))
}

/**
 * Alias for the {@link takeEnd} function.
 */
export const getLastElements: typeof takeEnd = takeEnd
