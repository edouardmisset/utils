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
 * @returns {number[]} Returns an array of numbers representing the range, or an empty array if step is 0.
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
 */
export function range(
  start: number,
  end: number,
  step = 1,
): number[] {
  if (step === 0) return []

  const adjustedStart = start === undefined ? 0 : start
  const adjustedEnd = end ?? start

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
