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
 * import { assert, assertEquals } from '@std/assert'
 *
 * // Random item from array
 * const numbers = [1, 2, 3, 4, 5]
 * const result = randomItem(numbers)
 * assertEquals(result.error, undefined)
 * assert(result.data !== undefined)
 * assert(numbers.includes(result.data))
 * ```
 *
 * @example
 * ```typescript
 * import { assert } from '@std/assert'
 *
 * // Empty array error
 * const emptyArray: number[] = []
 * const result = randomItem(emptyArray)
 * assert(result.error instanceof Error)
 * assert(result.error.message.includes('Array is empty'))
 * ```
 */
export function randomItem<T>(array: T[]): Result<T, Error> {
  if (array.length === 0) {
    return err(new Error('Array is empty'))
  }
  return ok(array[Math.floor(Math.random() * array.length)])
}
