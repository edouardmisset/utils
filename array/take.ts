/**
 * Returns the first `n` elements if `n` is positive or the last `n` elements if
 * `n` is negative from the given array.
 *
 * @template T - The type of the elements in the array.
 * @param {T[]} array - The array to take elements from.
 * @param {number} [n=1] - The number of elements to take. Defaults to 1 if not
 * provided.
 * @returns {T[]} The first `n` elements if `n` is positive or the last `n`
 * elements if `n` is negative from the given array.
 *
 * If `n` is positive, the function will return the first `n` elements from the
 * start of the array.
 * If `n` is negative, the function will return the last `n` elements from the
 * end of the array.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * assertEquals(take([1, 2, 3, 4]), [1])
 * assertEquals(take([1, 2, 3, 4], 2), [1, 2])
 * assertEquals(take([1, 2, 3, 4], -2), [3, 4])
 * ```
 */
export function take<T>(array: T[], n = 1): T[] {
  return n >= 0 ? array.slice(0, Math.abs(n)) : array.slice(-Math.abs(n))
}
