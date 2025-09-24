import { type Result } from '@edouardmisset/function'
import { scale } from './scale.ts'

/**
 * `rescale` function's parameters rescale a value between 0 and 1 given its range.
 */
export interface Rescale {
  /** The upper bound of the original range */
  maximum: number
  /** The lower bound of the original range */
  minimum: number
  /** The value to scale between 0 and 1 */
  value: number
}

/**
 * Scales a value from one range to a value between 0 and 1.
 *
 * @param {Object} parameters - The scaling parameters.
 * @param {number} parameters.value - The value to scale.
 * @param {number} parameters.minimum - The lower bound of the original range.
 * @param {number} parameters.maximum - The upper bound of the original range.
 * @returns {Result<number, Error>} A result object containing either the scaled value or an error.
 *
 * @example
 * ```typescript
 * const result = rescale({ value: 5, minimum: 0, maximum: 10 })
 * if (result.error) {
 *   console.error('Rescaling failed:', result.error.message)
 * } else {
 *   console.log('Rescaled value:', result.data) // 0.5
 * }
 * ```
 */
export function rescale(parameters: Rescale): Result<number, Error> {
  const { value, minimum, maximum } = parameters
  return scale({
    inMinimum: minimum,
    inMaximum: maximum,
    value,
    outMinimum: 0,
    outMaximum: 1,
  })
}