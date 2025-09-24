import { err, ok, type Result } from '@edouardmisset/function'

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
