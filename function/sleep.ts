import { err, ok, type Result } from '@edouardmisset/function'

/**
 * Pauses the execution of an asynchronous function for a specified time (ms).
 *
 * @param {number} milliseconds - The amount of time to sleep in milliseconds.
 * @returns {Promise<Result<void, RangeError>>} - A Promise that resolves to a result object.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Valid sleep duration
 * const result = await sleep(100)
 * assertEquals(result.error, undefined)
 * ```
 *
 * @example
 * ```typescript
 * import { assert } from '@std/assert'
 *
 * // Negative duration returns error
 * const result = await sleep(-1000)
 * assert(result.error instanceof RangeError)
 * assert(result.error.message.includes('Invalid time value'))
 * ```
 */
export function sleep(milliseconds: number): Promise<Result<void, RangeError>> {
  if (milliseconds < 0) {
    return Promise.resolve(err(
      new RangeError(
        `Invalid time value (${milliseconds} ms). Time must be a positive number.`,
      ),
    ))
  }

  return new Promise<Result<void, RangeError>>((resolve) =>
    setTimeout(
      () => {
        resolve(ok(undefined))
      },
      milliseconds,
    )
  )
}

/**
 * Alias for the {@link sleep} function.
 */
export const wait: typeof sleep = sleep
