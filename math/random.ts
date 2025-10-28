/**
 * Generates a random number between the specified minimum and maximum values (inclusive).
 *
 * @param minimum The minimum value.
 * @param maximum The maximum value.
 * @returns A random number between the minimum and maximum values.
 *
 * @example
 * ```typescript
 * import { assert } from '@std/assert'
 *
 * // Generates random float between 1 and 5
 * const result = random(1, 5)
 * assert(result >= 1 && result <= 5)
 * ```
 */
export function random(minimum: number, maximum: number): number {
  return minimum + Math.random() * (maximum - minimum)
}

/**
 * Generates a random integer between the specified minimum and maximum values (inclusive).
 *
 * @param minInt The minimum integer value.
 * @param maxInt The maximum integer value.
 * @returns A random integer between the minimum and maximum values.
 *
 * @example
 * ```typescript
 * import { assert } from '@std/assert'
 *
 * // Generates random integer between 1 and 5
 * const result = randomInt(1, 5)
 * assert(Number.isInteger(result))
 * assert(result >= 1 && result <= 5)
 * ```
 */
export function randomInt(minInt: number, maxInt: number): number {
  return minInt + Math.floor(Math.random() * (maxInt - minInt + 1))
}
