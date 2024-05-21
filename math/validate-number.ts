/**
 * Validates if the input is a number.
 * 
 * **Note**: `NaN` and `Infinity` are not considered valid numbers.
 *
 * @param {unknown} n - The input to validate.
 * @returns {boolean} Returns true if the input is a number and is finite, false
 * otherwise.
 *
 * @example
 * ```typescript
 * import { validateNumber } from './validate-number.ts'
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
export function validateNumber(n: unknown): boolean {
  if (typeof n === 'number') return Number.isFinite(n)
  // @ts-expect-error: we want to explicitly this test case (for runtime behavior)
  // deno-lint-ignore eqeqeq
  if (typeof n === 'string') return Number.isFinite(parseFloat(n)) && Number(n) == n

  return false
}