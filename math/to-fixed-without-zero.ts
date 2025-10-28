/**
 * This function converts a number to a string with a specified number of
 * decimals,
 * and removes trailing zeros after the decimal point.
 *
 * @param {number} number_ - The number to format.
 * @param {number} precision - The number of decimal places.
 * @returns {string} The formatted number as a string.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Removes trailing zeros
 * assertEquals(toFixedWithoutZeros(1.23000, 5), "1.23")
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Removes all trailing zeros and decimal point
 * assertEquals(toFixedWithoutZeros(1.00000, 5), "1")
 * ```
 */
export function toFixedWithoutZeros(
  number_: number,
  precision: number,
): string {
  return `${Number.parseFloat(number_.toFixed(precision))}`
}

/**
 * Alias for the {@link toFixedWithoutZeros} function.
 */
export const toFixed: typeof toFixedWithoutZeros = toFixedWithoutZeros
