/**
 * This function calculates the sum of all numbers provided as arguments.
 * It accepts either a single array of numbers or multiple number arguments.
 *
 * @param {...(number[] | number)[]} num - The numbers to sum.
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
export function sum(...num: (number[] | number)[]): number {
  return num.flat().reduce(
    (accumulator, value) => accumulator + value,
    0,
  )
}
