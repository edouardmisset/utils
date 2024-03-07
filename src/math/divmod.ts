type Quotient = number
type Remainder = number

/**
 * This function performs both division and modulo operation at the same time.
 * It returns the quotient and the remainder of the division of the dividend by
 * the divisor.
 *
 * @param {number} dividend - The number to be divided.
 * @param {Exclude<number, 0>} divisor - The number by which the dividend is to
 * be divided. This cannot be `0`
 * @returns {[number, number]} An array where the first element is the quotient
 * and the second element is the remainder.
 *
 * @example
 * ```ts
 * divmod(10, 3)
 * // returns [3, 1]
 * ```
 *
 * @example
 * ```ts
 * divmod(12, 3)
 * // returns [4, 0]
 * ```
 */
export function divmod(
  dividend: number,
  divisor: Exclude<number, 0>,
): [Quotient, Remainder] {
  if (dividend === 0) return [0, 0]
  if (divisor === 0) {
    throw new Error(`Cannot divide by zero (divisor: ${divisor})`)
  }

  const resultSign = Math.sign(dividend) * Math.sign(divisor)
  const remainder = Math.abs(dividend % divisor)

  return [
    resultSign * Math.floor(Math.abs(dividend / divisor)),
    remainder ? resultSign * remainder : 0,
  ]
}
