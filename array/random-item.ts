import { err, ok, type Result } from '@edouardmisset/function'

/**
 * Returns a random item from an array.
 *
 * @template T The type of the elements in the array.
 * @param {T[]} array The array to pick an item from.
 * @returns {Result<T, Error>} A result object containing either the random item or an error.
 *
 * @example
 * ```typescript
 * const numbers = [1, 2, 3, 4, 5]
 * const result = randomItem(numbers)
 * if (result.error) {
 *   console.error('Error:', result.error.message)
 * } else {
 *   console.log('Random number:', result.data) // e.g., 3 (output will vary)
 * }
 * ```
 *
 * @example
 * ```typescript
 * const emptyArray: number[] = []
 * const result = randomItem(emptyArray)
 * if (result.error) {
 *   console.error('Error:', result.error.message) // "Array is empty"
 * }
 * ```
 */
export function randomItem<T>(array: T[]): Result<T, Error> {
  if (array.length === 0) {
    return err(new Error('Array is empty'))
  }
  return ok(array[Math.floor(Math.random() * array.length)])
}
