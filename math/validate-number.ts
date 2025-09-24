/**
 * Validates if the input is a number.
 *
 * **Note**: `NaN` and `Infinity` are not considered valid numbers.
 *
 * @param {unknown} value - The input to validate.
 * @returns {boolean} Returns true if the input is a number and is finite, false
 * otherwise.
 *
 * @example
 * ```typescript
 * import { validateNumber } from '@edouardmisset/math'
 *
 * validateNumber(123)
 * // returns true
 *
 * validateNumber('123')
 * // returns true
 *
 * validateNumber('123abc')
 * // returns false
 *
 * validateNumber(Infinity)
 * // returns false
 * ```
 */
export function validateNumber(value: unknown): boolean {
  if (typeof value === 'number') return Number.isFinite(value)
  if (typeof value === 'string') {
    // @ts-expect-error: we want to explicitly to test this case (for runtime behavior)
    // deno-lint-ignore eqeqeq
    return Number.isFinite(parseFloat(value)) && Number(value) == value
  }

  return false
}
