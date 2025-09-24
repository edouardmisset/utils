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
export function percent(parameters: Rescale): Result<number, Error> {
  const { value, minimum, maximum } = parameters
  return scale({
    inMinimum: minimum,
    inMaximum: maximum,
    outMinimum: 0,
    outMaximum: 100,
    value,
  })
}