/**
 * This function calculates the sum of all numbers provided as arguments.
 * It accepts either a single array of numbers or multiple number arguments.
 *
 * @param {...(number[] | number)[]} number_ - The numbers to sum.
 * @returns {number} The sum of all numbers.
 *
 * @example
 * sum(1, 2, 3)
 * // returns 6
 *
 * @example
 * sum([1, 2, 3])
 * // returns 6
 *
 * @example
 * sum([])
 * // returns 0
 */
export function sum(...number_: (number[] | number)[]): number {
  return number_.flat().reduce(
    (accumulator, value) => accumulator + value,
    0,
  )
}
