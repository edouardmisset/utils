import { err, ok, type Result } from '@edouardmisset/function'

/**
 * Pauses the execution of an asynchronous function for a specified time (ms).
 *
 * @param {number} milliseconds - The amount of time to sleep in milliseconds.
 * @returns {Promise<Result<void, RangeError>>} - A Promise that resolves to a result object.
 *
 * @example
 * ```typescript
 * const result = await sleep(1000)
 * if (result.error) {
 *   console.error('Sleep failed:', result.error.message)
 * } else {
 *   console.log('Sleep completed successfully')
 * }
 * ```
 *
 * @example
 * ```typescript
 * const result = await sleep(-1000)
 * if (result.error) {
 *   console.log("Error:", result.error.message)
 *   // Error: Invalid time value (-1000 ms). Time must be a positive number.
 * }
 * ```
 */
export function sleep(milliseconds: number): Promise<Result<void, RangeError>> {
  if (milliseconds < 0) {
    return Promise.resolve(err(new RangeError(
      `Invalid time value (${milliseconds} ms). Time must be a positive number.`,
    ))
    )
  }

  return new Promise<Result<void, RangeError>>((resolve) =>
    setTimeout(
      () => resolve(ok(undefined)),
      milliseconds,
    )
  )
}

/**
 * Alias for the {@link sleep} function.
 */
export const wait: typeof sleep = sleep
