import { err, ok, type Result } from '@edouardmisset/function'

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
 * import { assertEquals } from '@std/assert'
 *
 * // Scale value to different range
 * const result = scale({ inMinimum: 0, inMaximum: 10, outMinimum: 0, outMaximum: 100, value: 5 })
 * assertEquals(result.error, undefined)
 * assertEquals(result.data, 50)
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Scale to default 0-1 range
 * const result = scale({ inMinimum: 0, inMaximum: 100, value: 50 })
 * assertEquals(result.error, undefined)
 * assertEquals(result.data, 0.5)
 * ```
 *
 * @example
 * ```typescript
 * import { assert } from '@std/assert'
 *
 * // Error: same min and max
 * const result = scale({ inMinimum: 5, inMaximum: 5, value: 5 })
 * assert(result.error instanceof RangeError)
 * assert(result.error.message.includes('division by 0'))
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

/** `scale` function's parameters. */
export type ScaleParameters = {
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
