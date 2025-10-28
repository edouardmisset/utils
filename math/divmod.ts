import { err, ok, type Result } from '@edouardmisset/function'

/**
 * A type that represents the quotient of a division operation (`number`).
 */
export type Quotient = number

/**
 * A type that represents the remainder of a division operation (`number`).
 */
export type Remainder = number

/**
 * This function performs both division and modulo operation at the same time.
 * It returns the quotient and the remainder of the division of the dividend by
 * the divisor.
 *
 * @param {number} dividend - The number to be divided.
 * @param {number} divisor - The number by which the dividend is to be divided.
 * @returns {Result<[number, number], Error>} A result object containing either an array where
 * the first element is the quotient and the second element is the remainder, or an error.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Division with remainder
 * const result = divmod(10, 3)
 * assertEquals(result.error, undefined)
 * assertEquals(result.data, [3, 1])
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Even division
 * const result = divmod(12, 3)
 * assertEquals(result.error, undefined)
 * assertEquals(result.data, [4, 0])
 * ```
 *
 * @example
 * ```typescript
 * import { assert } from '@std/assert'
 *
 * // Division by zero error
 * const result = divmod(10, 0)
 * assert(result.error instanceof Error)
 * assert(result.error.message.includes('Cannot divide by zero'))
 * ```
 */
export function divmod(
  dividend: number,
  divisor: number,
): Result<[Quotient, Remainder], Error> {
  if (dividend === 0) return ok([0, 0]) as Result<[Quotient, Remainder], Error>
  if (divisor === 0) {
    return err(
      new Error(`Cannot divide by zero (divisor: ${divisor})`),
    ) as Result<[Quotient, Remainder], Error>
  }

  const resultSign = Math.sign(dividend) * Math.sign(divisor)
  const remainder = Math.abs(dividend % divisor)

  return ok([
    resultSign * Math.floor(Math.abs(dividend / divisor)),
    remainder ? resultSign * remainder : 0,
  ]) as Result<[Quotient, Remainder], Error>
}
