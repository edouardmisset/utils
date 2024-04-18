/**
 * Shuffles an array, returning a new array with the same elements in a random
 * order.
 *
 * @template T The type of the elements in the array.
 * @param {T[]} originalArray The array to shuffle.
 * @returns {T[]} A new array with the same elements as the original array, but
 * in a random order.
 *
 * @example
 * ```typescript
 * const numbers = [1, 2, 3, 4, 5]
 * randomSort(numbers)
 * // returns [3, 1, 5, 2, 4] (output will vary)
 * ```
 */
export function randomSort<T>(originalArray: T[]): T[] {
  return originalArray
    .map((value) => ({ value, randomValue: Math.random() }))
    .sort((a, b) => a.randomValue - b.randomValue)
    .map(({ value }) => value)
}

/**
 * Alias for the {@link randomSort} function.
 */
export const shuffleArray: typeof randomSort = randomSort
