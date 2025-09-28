import { err, ok, type Result } from '@edouardmisset/function'

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
 * import { assertEquals } from '@std/assert'
 *
 * const result = range({start:1, end:5})
 *
 * assertEquals(result.error, undefined)
 * assertEquals(result.data, [1, 2, 3, 4, 5])
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const result = range({end:4})
 *
 * assertEquals(result.error, undefined)
 * assertEquals(result.data, [0, 1, 2, 3, 4])
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const result = range({start:0, end:20, step:5})
 *
 * assertEquals(result.error, undefined)
 * assertEquals(result.data, [0, 5, 10, 15, 20])
 * ```
 */
export function range(
  { start, step = 1, end }: { start?: number; end: number; step?: number },
): Result<number[], Error> {
  if (step === 0) {
    return err(new Error('step cannot be 0'))
  }

  const adjustedStart = start === undefined ? 0 : start
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
