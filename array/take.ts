import { takeEnd } from './take-end.ts'
import { takeStart } from './take-start.ts'

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
 * take([1, 2, 3, 4]) // returns [1]
 * take([1, 2, 3, 4], 2) // returns [1, 2]
 * take([1, 2, 3, 4], -2) // returns [3, 4]
 * ```
 */
export function take<T>(array: T[], n = 1): T[] {
  return n >= 0 ? takeStart(array, n) : takeEnd(array, n)
}