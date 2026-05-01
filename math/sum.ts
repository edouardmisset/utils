/**
 * This function calculates the sum of all numbers provided as arguments.
 * It accepts either a single array of numbers or multiple number arguments.
 *
 * @deprecated Deprecated and scheduled for removal in v6, native
 * `Math.sumPrecise` should be preferred.
 *
 * Migration (native):
 * ```typescript ignore
 * import { assertEquals } from '@std/assert'
 *
 * assertEquals(Math.sumPrecise([1, 2, 3]), 6)
 * ```
 *
 * API availability:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sumPrecise#browser_compatibility
 *
 * @param {...(number[] | number)[]} number_ - The numbers to sum.
 * @returns {number} The sum of all numbers.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Multiple arguments
 * assertEquals(sum(1, 2, 3), 6)
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Array argument
 * assertEquals(sum([1, 2, 3]), 6)
 * // Empty array
 * assertEquals(sum([]), 0)
 * ```
 */
export function sum(...number_: (number[] | number)[]): number {
  return number_.flat().reduce(
    (accumulator, value) => accumulator + value,
    0,
  )
}
