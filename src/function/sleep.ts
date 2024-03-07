/**
 * Pauses the execution of an asynchronous function for a specified time (ms).
 *
 * @param {number} milliseconds - The amount of time to sleep in milliseconds.
 * @returns {Promise<void>} - A Promise that resolves after the specified time.
 * @throws {Error} - Throws an error if the time is a negative number.
 *
 * @example
 * ```typescript
 * await sleep(1000)
 * // pauses for 1 second
 * ```
 *
 * @example
 * ```typescript
 * await sleep(-1000)
 * // throws Error: Invalid time value. Time must be a non-negative number.
 * ```
 */
export function sleep(milliseconds: number): Promise<void> {
  if (milliseconds < 0)
    throw new Error(`Invalid time value (${milliseconds} ms). Time must be a positive number.`)

  return new Promise<void>(resolve => setTimeout(resolve, milliseconds))
}