/**
 * Shuffles an array, returning a new array with the same elements in a random
 * order.
 *
 * @template T The type of the elements in the array.
 * @param {T[]} array The array to shuffle.
 * @returns {T[]} A new array with the same elements as the original array, but
 * in a random order.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const numbers = [1, 2, 3, 4, 5]
 * const result = randomSort(numbers)
 * assertEquals(result.length, 5)
 * ```
 */
export function randomSort<T>(array: T[]): T[] {
  const result = [...array]
  for (let right = result.length - 1; right > 0; right--) {
    const randomIndex = Math.floor(Math.random() * (right + 1))
    ;[result[right], result[randomIndex]] = [result[randomIndex], result[right]]
  }
  return result
}

/**
 * Alias for the {@link randomSort} function.
 */
export const shuffleArray: typeof randomSort = randomSort
