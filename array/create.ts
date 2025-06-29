import { err, ok, Result } from '../function/try-catch.ts'

/**
 * Creates an array of a specified length and populates it with the results of calling a provided function on every index in the array.
 *
 * @template T - The type of elements in the resulting array.
 * @param {number} length - The length of the array to create.
 * @param {function(_: unknown, index: number): T} [transform] - The function to call on every index in the array. By default, it returns the index itself.
 * @returns {T[]} An array of length `length` with its elements being the result of the `transform` function.
 *
 * @example
 * ```typescript
 * import { createArray } from './create.ts'
 *
 * createArray(5, (_, index) => index * 2)
 * // returns [0, 2, 4, 6, 8]
 * ```
 *
 * @example
 * ```typescript
 * import { createArray } from './create.ts'
 *
 * createArray(5, (_, index) => `Item ${index}`)
 * // returns ['Item 0', 'Item 1', 'Item 2', 'Item 3', 'Item 4']
 * ```
 *
 * @example
 * ```typescript
 * import { createArray } from './create.ts'
 *
 * // Create an array of numbers using the default transform function
 * createArray(5)
 * // returns [0, 1, 2, 3, 4]
 * ```
 */
export function createArray<T = number>(
  length: number,
  // @ts-expect-error: I don't know how to fix this type error
  callback: Parameters<typeof Array.from<T, U>>[1] = (_, index): number =>
    index,
): T[] {
  return Array.from({ length }, callback) as T[]
}

/**
 * Creates an array of numbers (positive and/or negative) progressing from
 * `start` up to `end` (included).
 *
 * If `end` is not provided, it defaults to `start` with `start` then set to 0.
 *
 * **Note**: The output of this function is sorted in ascending order.
 *
 * @default step = 1
 *
 * @param {number} start - The start of the range.
 * @param {number} [end] - The end of the range.
 * @param {number} [step=1] - The value to increment or decrement by.
 * @returns {Result<number[], Error>} Returns a Result containing the range of numbers or an Error if step is 0.
 *
 * @example
 * ```typescript
 * import { range } from './create.ts'
 * import { assertEquals } from '@std/assert'
 *
 * const result = range({start:4})
 * if (result.error) {
 *   console.log('Error:', result.error.message)
 * } else {
 *   assertEquals(result.data, [0, 1, 2, 3, 4])
 * }
 * ```
 *
 * @example
 * ```typescript
 * import { range } from './create.ts'
 *
 * const result = range({start:-4})
 * if (result.error) {
 *   console.log('Error:', result.error.message)
 * } else {
 *   console.log(result.data) // [-4, -3, -2, -1, 0]
 * }
 * ```
 *
 * @example
 * ```typescript
 * import { range } from './create.ts'
 *
 * const result = range({start:1, end:5})
 * if (result.error) {
 *   console.log('Error:', result.error.message)
 * } else {
 *   console.log(result.data) // [1, 2, 3, 4, 5]
 * }
 * ```
 *
 * @example
 * ```typescript
 * import { range } from './create.ts'
 *
 * const result = range({start:0, end:20, step:5})
 * if (result.error) {
 *   console.log('Error:', result.error.message)
 * } else {
 *   console.log(result.data) // [0, 5, 10, 15, 20]
 * }
 * ```
 *
 * @example
 * ```typescript
 * import { range } from './create.ts'
 *
 * const result = range({start:0, end:10, step:0})
 * if (result.error) {
 *   console.log('Error:', result.error.message) // "step cannot be 0"
 * }
 * ```
 */
export function range(
  { start, step = 1, end }: { start: number; end?: number; step?: number },
): Result<number[], Error> {
  if (step === 0) {
    return err(new Error('step cannot be 0'))
  }

  const adjustedStart = end === undefined ? 0 : start
  const adjustedEnd = end ?? start

  const lowerBound = Math.min(adjustedStart, adjustedEnd)
  const upperBound = Math.max(adjustedStart, adjustedEnd)

  const length = Math.ceil(Math.abs(upperBound - lowerBound) / Math.abs(step)) +
    1

  const result = Array.from(
    { length },
    (_, index) => lowerBound + index * ((step < 0) ? -step : step),
  ).sort((a, b) => a - b)

  return ok(result)
}

/**
 * Alias for the {@link range} function.
 */
export const sequence: typeof range = range
