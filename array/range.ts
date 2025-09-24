import { err, ok, type Result } from '@edouardmisset/function'

/**
 * Creates an array of numbers (positive and/or negative) progressing from
 * `start` up to `end` (included).
 *
 * If `end` is not provided, it defaults to `start` with `start` then set to 0.
 *
 * Note: The output of this function is sorted in ascending order.
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
