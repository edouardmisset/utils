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
 * // Returns [4]
 * takeEnd([1, 2, 3, 4], 2) 
 * // Returns [3, 4]
 * takeEnd([1, 2, 3, 4], -2) 
 * // Returns [3, 4]
 * ```
 */
export function takeEnd<T>(array: T[], n: number = 1): T[] {
  return array.slice(-Math.abs(n))
}
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
 * takeStart([1, 2, 3, 4]) // Returns [1]
 * takeStart([1, 2, 3, 4], 2) // Returns [1, 2]
 * takeStart([1, 2, 3, 4], -2) // Returns [1, 2]
 * ```
 */
export function takeStart<T>(array: T[], n: number = 1): T[] {
  return array.slice(0, Math.abs(n))
}
/**
 * Returns the first `n` elements if `n` is positive or the last `n` elements if `n` is negative from the given array.
 *
 * @template T - The type of the elements in the array.
 * @param {T[]} array - The array to take elements from.
 * @param {number} [n=1] - The number of elements to take. Defaults to 1 if not provided.
 * @returns {T[]} The first `n` elements if `n` is positive or the last `n` elements if `n` is negative from the given array.
 *
 * If `n` is positive, the function will return the first `n` elements from the start of the array.
 * If `n` is negative, the function will return the last `n` elements from the end of the array.
 *
 * @example
 * ```typescript
 * take([1, 2, 3, 4]) // Returns [1]
 * take([1, 2, 3, 4], 2) // Returns [1, 2]
 * take([1, 2, 3, 4], -2) // Returns [3, 4]
 * ```
 */
export function take<T>(array: T[], n: number = 1): T[] {
  return n >= 0 ? takeStart(array, n) : takeEnd(array, n)
}
