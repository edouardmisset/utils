import type { Result } from '@edouardmisset/function'
import { scale } from '@edouardmisset/math'
import type { ValueAndRange } from '@edouardmisset/type'

/**
 * Normalize a value from one range to a value between 0 and 1.
 *
 * @param {Object} parameters - The scaling parameters.
 * @param {number} parameters.value - The value to normalize.
 * @param {number} parameters.minimum - The lower bound of the original range.
 * @param {number} parameters.maximum - The upper bound of the original range.
 * @returns {Result<number, Error>} A result object containing either the normalized value or an error.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Normalize value to 0-1 range
 * const result = normalize({ value: 5, minimum: 0, maximum: 10 })
 * assertEquals(result.error, undefined)
 * assertEquals(result.data, 0.5)
 * ```
 */

export function normalize(parameters: ValueAndRange): Result<number, Error> {
  const { value, minimum, maximum } = parameters
  return scale({
    inMinimum: minimum,
    inMaximum: maximum,
    value,
    outMinimum: 0,
    outMaximum: 1,
  })
}
