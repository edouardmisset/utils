import { err, ok, type Result } from '@edouardmisset/function'

/**
 * Calculates the average of the given numbers.
 *
 * @param {...(number[] | number)[]} numbers - The numbers to calculate the average of.
 * @returns {Result<number, Error>} A result object containing either the average or an error.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Multiple number arguments
 * const result = average(1, 2, 3, 4, 5)
 * assertEquals(result.error, undefined)
 * assertEquals(result.data, 3)
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Array of numbers
 * const result = average([1, 2, 3, 4, 5])
 * assertEquals(result.error, undefined)
 * assertEquals(result.data, 3)
 * ```
 *
 * @example
 * ```typescript
 * import { assert } from '@std/assert'
 *
 * // No arguments returns error
 * const result = average()
 * assert(result.error instanceof Error)
 * assert(result.error.message.includes('Cannot calculate average'))
 * ```
 */
export function average(
  ...numbers: (number[] | number)[]
): Result<number, Error> {
  const nums = numbers.flat()

  if (nums.length === 0) {
    return err(
      new Error(
        `Cannot calculate average if no values are passed in (${
          String(numbers)
        })`,
      ),
    )
  }

  const average = nums.reduce((accumulator, value) => accumulator + value, 0) /
    nums.length

  return ok(average)
}

/**
 * Alias for the {@link average} function.
 */
export const mean: typeof average = average
