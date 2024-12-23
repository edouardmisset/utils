/**
 * This function rounds a number to a specified precision.
 *
 * Use cases:
 * - Formatting numbers for display: You can use this function to round numbers to a certain number of decimal places for display in a user interface.
 * - Data analysis: This function can be used to round numbers to reduce the impact of very small variations in data analysis.
 * - Mathematical calculations: This function can be used to approximate numbers to make calculations simpler or faster.
 *
 * @param {number} number_ - The number to round.
 * @param {number} [precision=0] - The number of decimal places to round to. Defaults to 0 if not provided.
 * @returns {number} The number rounded to the specified precision.
 *
 * @example
 * ```typescript
 * roundToPrecision(1.2365, 2)
 * // returns 1.24
 * ```
 *
 * @example
 * ```typescript
 * roundToPrecision(1.2345)
 * // returns 1
 * ```
 */
export function roundToPrecision(number_: number, precision = 0): number {
  return Math.round(number_ * 10 ** precision) / 10 ** precision
}
