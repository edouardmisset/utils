/**
 * Creates an array of numbers (positive and/or negative) progressing from
 * `start` up to `end` (included).
 *
 * If `end` is not provided, the function creates a range from 0 to `start`
 * (included).
 *
 * **Note**: The output of this function is always sorted in ascending order.
 *
 * @param {number} start - The start of the range. If `end` is not provided,
 * this becomes the end and start defaults to 0.
 * @param {number} [end] - The end of the range (included).
 * @param {number} [step=1] - The value to increment by. Negative values are
 * converted to positive.
 * @returns {number[]} Returns an array of numbers representing the range, or an
 * empty array if step is 0.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const result = range(1, 5)
 *
 * assertEquals(result, [1, 2, 3, 4, 5])
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const result = range(0, 4)
 *
 * assertEquals(result, [0, 1, 2, 3, 4])
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const result = range(0, 20, 5)
 *
 * assertEquals(result, [0, 5, 10, 15, 20])
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // When end is not provided, creates range from 0 to start
 * const result = range(5)
 *
 * assertEquals(result, [0, 1, 2, 3, 4, 5])
 * ```
 */
export function range(
  start: number,
  end?: number,
  step = 1,
): number[] {
  if (step === 0) return []

  const adjustedEnd = end ?? start
  const adjustedStart = end === undefined ? 0 : start

  const lowerBound = Math.min(adjustedStart, adjustedEnd)
  const upperBound = Math.max(adjustedStart, adjustedEnd)

  const length = Math.ceil(Math.abs(upperBound - lowerBound) / Math.abs(step)) +
    1

  return Array.from(
    { length },
    (_, index) => lowerBound + index * ((step < 0) ? -step : step),
  ).sort((a, b) => a - b)
}

/**
 * Alias for the {@link range} function.
 */
export const sequence: typeof range = range
