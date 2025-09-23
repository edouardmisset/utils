import { err, ok, type Result } from '@edouardmisset/function'

/**
 * Calculates the average of the given numbers.
 *
 * @param {...(number[] | number)[]} numbers - The numbers to calculate the average of.
 * @returns {Result<number, Error>} A result object containing either the average or an error.
 *
 * @example
 * ```typescript
 * const result = average(1, 2, 3, 4, 5)
 * if (result.error) {
 *   console.error('Average calculation failed:', result.error.message)
 * } else {
 *   console.log('Average:', result.data) // 3
 * }
 * ```
 *
 * @example
 * ```typescript
 * const result = average([1, 2, 3, 4, 5])
 * if (result.error) {
 *   console.error('Average calculation failed:', result.error.message)
 * } else {
 *   console.log('Average:', result.data) // 3
 * }
 * ```
 *
 * @example
 * ```typescript
 * const result = average()
 * if (result.error) {
 *   console.log('Error:', result.error.message) // "Cannot calculate average if no values are passed in"
 * }
 * ```
 */
export function average(
  ...numbers: (number[] | number)[]
): Result<number, Error> {
  const nums = numbers.flat()

  if (nums.length === 0) {
    return err(
      new Error(
        `Cannot calculate average if no values are passed in (${String(numbers)
        })`,
      ),
    )
  }

  const average =
    nums.reduce((accumulator, value) => accumulator + value, 0) /
    nums.length

  return ok(average)
}

/**
 * Alias for the {@link average} function.
 */
export const mean: typeof average = average
