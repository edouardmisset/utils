/**
 * Returns the first `n` elements from the given array.
 *
 * @template T - The type of the elements in the array.
 * @param {T[]} array - The array to take elements from.
 * @param {number} [n=1] - The number of elements to take. Defaults to 1 if not provided.
 * @returns {T[]} The first `n` elements from the given array.
 *
 * The `Math.abs(n)` is used to ensure that `n` is always positive. If a negative number is passed, it will be converted to a positive number.
 * This means that the function will always return the first `n` elements, even if `n` is negative.
 *
 * @example
 * ```typescript
 * takeStart([1, 2, 3, 4]) // returns [1]
 * takeStart([1, 2, 3, 4], 2) // returns [1, 2]
 * takeStart([1, 2, 3, 4], -2) // returns [1, 2]
 * ```
 */
export function takeStart<T>(array: T[], n = 1): T[] {
  return array.slice(0, Math.abs(n))
}

/**
 * Alias for the {@link takeStart} function.
 */
export const getFirstElements: typeof takeStart = takeStart