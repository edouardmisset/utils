import type { Result } from '@edouardmisset/function'
import { ok } from '../function/ok.ts'
import { err } from '../function/err.ts'

/**
 * `scale` function's parameters.
 */
export interface ScaleParameters {
  /** The upper bound of the original range */
  inMaximum: number
  /** The lower bound of the original range */
  inMinimum: number
  /** The upper bound of the target range */
  outMaximum?: number
  /** The lower bound of the target range */
  outMinimum?: number
  /** The value to transform */
  value: number
}

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
 * Scales a value from one range to another.
 *
 * @param {Object} parameters - The scaling parameters.
 * @param {number} parameters.inMinimum - The lower bound of the original range.
 * @param {number} parameters.inMaximum - The upper bound of the original range.
 * @param {number} [parameters.outMinimum=0] - The lower bound of the target range.
 * @param {number} [parameters.outMaximum=1] - The upper bound of the target range.
 * @param {number} parameters.value - The value to scale.
 * @returns {Result<number, Error>} A result object containing either the scaled value or an error.
 *
 * @example
 * ```typescript
 * const result = scale({ inMinimum: 0, inMaximum: 10, outMinimum: 0, outMaximum: 100, value: 5 })
 * if (result.error) {
 *   console.error('Scaling failed:', result.error.message)
 * } else {
 *   console.log('Scaled value:', result.data) // 50
 * }
 * ```
 *
 * @example
 * ```typescript
 * const result = scale({ inMinimum: 0, inMaximum: 100, value: 50 })
 * if (result.error) {
 *   console.error('Scaling failed:', result.error.message)
 * } else {
 *   console.log('Scaled value:', result.data) // 0.5
 * }
 * ```
 *
 * @example
 * ```typescript
 * const result = scale({ inMinimum: 5, inMaximum: 5, value: 5 })
 * if (result.error) {
 *   console.log('Error:', result.error.message) // "inMinimum (5) cannot equal inMaximum (5) as this leads to a division by 0."
 * }
 * ```
 */
export function scale(parameters: ScaleParameters): Result<number, Error> {
  const { inMinimum, inMaximum, outMinimum = 0, outMaximum = 1, value } =
    parameters

  return inMinimum === inMaximum
    ? err(
      new RangeError(
        `inMinimum (${inMinimum}) cannot equal inMaximum (${inMaximum}) as this leads to a division by 0.`,
      ),
    )
    : ok(
      outMinimum + ((value - inMinimum) * (outMaximum - outMinimum)) /
          (inMaximum - inMinimum),
    )
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
// Note: percent moved to `percent.ts`.

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
// Note: rescale moved to `rescale.ts`.
