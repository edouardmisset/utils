/**
 * Calculates the average of the given numbers.
 *
 * @param {number[] | number} num - The numbers to calculate the average of.
 * @throws {Error} When no arguments are provided.
 * @returns {number} The average of the given numbers.
 *
 * @example
 * ```typescript
 * average(1, 2, 3, 4, 5)
 * // returns 3
 * ```
 *
 * @example
 * ```typescript
 * average([1, 2, 3, 4, 5])
 * // returns 3
 * ```
 */
export function average(...num: (number[] | number)[]): number {
  const numbers = num.flat()

  if (numbers.length === 0) {
    throw new Error(
      `Cannot calculate average if no values are passed in (${String(num)})`,
    )
  }

  return (
    numbers.reduce((accumulator, value) => accumulator + value, 0) /
    numbers.length
  )
}

/**
 * Alias for the {@link average} function.
 */
export const mean = average
