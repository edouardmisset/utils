/**
 * `scale` function's parameters.
 */
export interface ScaleParameters {
  inMaximum: number
  inMinimum: number
  outMaximum?: number
  outMinimum?: number
  value: number
}

/**
 * `rescale` function's parameters.
 */
export interface Rescale {
  maximum: number
  minimum: number
  value: number
}

/**
 * Scales a value from one range to another.
 *
 * @param {Object} params - The scaling parameters.
 * @param {number} params.inMinimum - The lower bound of the original range.
 * @param {number} params.inMaximum - The upper bound of the original range.
 * @param {number} [params.outMinimum=0] - The lower bound of the target range.
 * @param {number} [params.outMaximum=1] - The upper bound of the target range.
 * @param {number} params.value - The value to scale.
 * @returns {number} The scaled value.
 * @throws {Error} Will throw an error if inMinimum equals inMaximum (to prevent division by zero).
 *
 * @example
 * ```typescript
 * scale({ inMinimum: 0, inMaximum: 10, outMinimum: 0, outMaximum: 100, value: 5 })
 * // returns 50
 * ```
 *
 * @example
 * ```typescript
 * scale({ inMinimum: 0, inMaximum: 100, value: 50 })
 * // returns 0.5
 * ```
 */
export function scale(params: ScaleParameters): number {
  const { inMinimum, inMaximum, outMinimum = 0, outMaximum = 1, value } = params
  if (inMinimum === inMaximum) {
    throw new Error(
      `inMinimum (${inMinimum}) cannot equal inMaximum (${inMaximum}) as this leads to a division by 0.`,
    )
  }
  return (
    ((value - inMinimum) * (outMaximum - outMinimum)) /
    ((inMaximum - inMinimum) + outMinimum)
  )
}

/**
 * Scales a value from one range to another, outputting a percentage.
 *
 * @param {Object} params - The scaling parameters.
 * @param {number} params.value - The value to scale.
 * @param {number} params.minimum - The lower bound of the original range.
 * @param {number} params.maximum - The upper bound of the original range.
 * @returns {number} The scaled value as a percentage.
 *
 * @example
 * ```typescript
 * percent({ value: 5, minimum: 0, maximum: 10 })
 * // returns 50
 * ```
 */
export function percent(params: Rescale): number {
  const { value, minimum, maximum } = params
  return scale({
    inMinimum: minimum,
    inMaximum: maximum,
    outMinimum: 0,
    outMaximum: 100,
    value,
  })
}

/**
 * Scales a value from one range to another value between 0 and 1.
 *
 * @param {Object} params - The scaling parameters.
 * @param {number} params.value - The value to scale.
 * @param {number} params.minimum - The lower bound of the original range.
 * @param {number} params.maximum - The upper bound of the original range.
 * @returns {number} The scaled value.
 *
 * @example
 * ```typescript
 * rescale({ value: 5, minimum: 0, maximum: 10 })
 * // returns 0.5
 * ```
 */
export function rescale(params: Rescale): number {
  const { value, minimum, maximum } = params
  return scale({
    inMinimum: minimum,
    inMaximum: maximum,
    value,
    outMinimum: 0,
    outMaximum: 1,
  })
}
