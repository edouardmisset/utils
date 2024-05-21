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
  transform: Parameters<typeof Array.from<T, U>>[1] = (_, index) => index,
): T[] {
  return Array.from({ length }, transform) as T[]
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
 * @returns {number[]} Returns the range of numbers.
 *
 * @example
 * ```typescript
 * import { range } from './create.ts'
 * import { assertEquals } from '@std/assert/assert_equals'
 *
 * assertEquals(range(4), [0, 1, 2, 3, 4])
 * ```
 *
 * @example
 * ```typescript
 * import { range } from './create.ts'
 *
 * range(-4)
 * // returns [-4, -3, -2, -1, 0]
 * ```
 *
 * @example
 * ```typescript
 * import { range } from './create.ts'
 *
 * range(1, 5)
 * // returns [1, 2, 3, 4, 5]
 * ```
 *
 * @example
 * ```typescript
 * import { range } from './create.ts'
 *
 * range(0, 20, 5)
 * // returns [0, 5, 10, 15, 20]
 * ```
 */
export function range(start: number, end?: number, step = 1): number[] {
  if (step === 0) throw new Error('step cannot be 0')

  const adjustedStart = end === undefined ? 0 : start
  const adjustedEnd = end ?? start

  const lowerBound = Math.min(adjustedStart, adjustedEnd)
  const upperBound = Math.max(adjustedStart, adjustedEnd)

  const length = Math.ceil(Math.abs(upperBound - lowerBound) / Math.abs(step)) +
    1

  return Array.from(
    { length },
    (_, i) => lowerBound + i * ((step < 0) ? -step : step),
  ).sort((a, b) => a - b)
}

/**
 * Alias for the {@link range} function.
 */
export const sequence: typeof range = range
