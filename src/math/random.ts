/**
 * Generates a random number between the specified minimum and maximum values (inclusive).
 *
 * @param minimum The minimum value.
 * @param maximum The maximum value.
 * @returns A random number between the minimum and maximum values.
 *
 * @example
 * ```typescript
 * random(1, 5)
 * // returns a random number between 1 and 5 for example: 1.2
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
 * randomInt(1, 5)
 * // returns a random integer between 1 and 5 for example: 3
 * ```
 */
export function randomInt(minInt: number, maxInt: number): number {
  return minInt + Math.floor(Math.random() * (maxInt - minInt + 1))
}
