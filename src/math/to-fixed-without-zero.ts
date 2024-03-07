/**
 * This function converts a number to a string with a specified number of
 * decimals,
 * and removes trailing zeros after the decimal point.
 *
 * @param {number} num - The number to format.
 * @param {number} precision - The number of decimal places.
 * @returns {string} The formatted number as a string.
 *
 * @example
 * ```typescript
 * const result = toFixedWithoutZeros(1.23000, 5)
 * // returns "1.23"
 * ```
 *
 * @example
 * ```typescript
 * const result = toFixedWithoutZeros(1.00000, 5)
 * // returns "1"
 * ```
 */
export function toFixedWithoutZeros(num: number, precision: number): string {
  return `${Number.parseFloat(num.toFixed(precision))}`
}

/**
 * Alias for the {@link toFixedWithoutZeros} function.
 */
export const toFixed = toFixedWithoutZeros
