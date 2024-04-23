/**
 * Returns a random item from an array.
 *
 * @template T The type of the elements in the array.
 * @param {T[]} arr The array to pick an item from.
 * @returns {T} A random item from the array.
 * @throws {Error} If the array is empty.
 *
 * @example
 * ```typescript
 * const numbers = [1, 2, 3, 4, 5]
 * const randomNumber = randomItem(numbers)
 * // returns 3 (output will vary)
 * ```
 */
export function randomItem<T>(arr: T[]): T {
  if (arr.length === 0) throw new Error('Array is empty')
  return arr[Math.floor(Math.random() * arr.length)]
}
