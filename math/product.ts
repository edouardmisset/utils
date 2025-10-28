/**
 * This function calculates the product of all numbers provided as arguments.
 * It accepts either a single array of numbers or multiple number arguments.
 *
 * @param {...(number[] | number)[]} number_ - The numbers to multiply.
 * @returns {number} The product of all numbers.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Multiple number arguments
 * assertEquals(product(1, 2, 3, 4), 24)
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Array of numbers
 * assertEquals(product([1, 2, 3, 4]), 24)
 * ```
 */
export function product(...number_: (number | number[])[]): number {
  return number_.flat().reduce(
    (accumulator, value) => accumulator * value,
    1,
  )
}
