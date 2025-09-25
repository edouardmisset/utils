import { scale } from '@edouardmisset/math/scale.ts'
import type { ValueAndRange } from '@edouardmisset/type/type-helpers.ts'
import type { Result } from '../function/try-catch.ts'

/**
 * Scales a value from one range to another, outputting a percentage.
 *
 * @param {Object} parameters - The scaling parameters.
 * @param {number} parameters.value - The value to scale.
 * @param {number} parameters.minimum - The lower bound of the original range.
 * @param {number} parameters.maximum - The upper bound of the original range.
 * @returns {Result<number, Error>} A result object containing either the scaled value as a percentage or an error.
 *
 * @example
 * ```typescript
 * const result = percent({ value: 5, minimum: 0, maximum: 10 })
 * if (result.error) {
 *   console.error('Percentage calculation failed:', result.error.message)
 * } else {
 *   console.log('Percentage:', result.data) // 50
 * }
 * ```
 */

export function percent(parameters: ValueAndRange): Result<number, Error> {
  const { value, minimum, maximum } = parameters
  return scale({
    inMinimum: minimum,
    inMaximum: maximum,
    outMinimum: 0,
    outMaximum: 100,
    value,
  })
}
