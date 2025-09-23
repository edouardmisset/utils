import { isFunction } from '@edouardmisset/function'

/**
 * Wraps a Promise, function or async function in a try-catch block and returns
 * a result object with either data or error.
 * This utility helps avoid the need for try-catch blocks when handling async
 * operations.
 *
 * @template T - The type of the data returned by the promise when successful.
 * @template E - The type of the error that can be thrown (defaults to Error).
 * @param {Promise<T> | (() => T)} input - The promise to execute and handle, or a synchronous function to call.
 * @returns {Promise<Result<T, E>> | Result<T, E>} - A promise that resolves to a result object
 * containing either data or error, or the result object directly for sync functions.
 *
 * @example
 * ```typescript
 * import { assertEquals } from "@std/assert"
 *
 * // Synchronous function success case
 * const syncResult = tryCatch(() => JSON.parse('{"valid": "json"}'))
 * assertEquals(syncResult.data.valid, "json")
 * assertEquals(syncResult.error, undefined)
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from "@std/assert"
 *
 * // Synchronous function error case
 * const syncErrorResult = tryCatch(() => JSON.parse('invalid json'))
 * assertEquals(syncErrorResult.data, undefined)
 * assertEquals(syncErrorResult.error instanceof SyntaxError, true)
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from "@std/assert"
 *
 * // Success case
 * const successResult = await tryCatch(Promise.resolve("hello"))
 * assertEquals(successResult.data, "hello")
 * assertEquals(successResult.error, undefined)
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from "@std/assert"
 *
 * // Error case
 * const errorResult = await tryCatch(Promise.reject(new Error("failed")))
 * assertEquals(errorResult.data, undefined)
 * assertEquals(errorResult.error?.message, "failed")
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from "@std/assert"
 *
 * // Fetch API example
 * const result = await tryCatch(fetch("https://api.example.com/data"))
 * if (result.error) {
 *   console.error("Request failed:", result.error)
 * } else {
 *   console.log("Request successful:", result.data)
 * }
 * assertEquals(typeof result.data !== 'undefined' || result.error !== undefined, true)
 * ```
 */
export type Success<T> = { data: T; error: undefined }
export type Failure<E> = { data: undefined; error: E }

export type Result<T, E = Error> = Success<T> | Failure<E>

/**
 * Creates a successful Result object containing the provided data.
 *
 * @template T - The type of the data.
 * @param {T} data - The data to wrap in a Result.
 * @returns {Result<T>} A Result object with the data and no error.
 */
export function ok<T>(data: T): Success<T> {
  return { data, error: undefined }
}

/**
 * Creates a failed Result object containing the provided error.
 *
 * @template E - The type of the error.
 * @param {E} error - The error to wrap in a Result.
 * @returns {Result<undefined, E>} A Result object with the error and no data.
 */
export function err<E = Error>(error: E): Failure<E> {
  return { data: undefined, error }
}

// Overload for synchronous functions
export function tryCatch<T, E = Error>(
  fn: () => T,
): Result<T, E>

// Overload for promises
export function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>>

// Implementation
export function tryCatch<T, E = Error>(
  fn: (() => T) | Promise<T>,
): Result<T, E> | Promise<Result<T, E>> {
  // Handle synchronous function
  if (isFunction(fn)) {
    try {
      const data = fn()
      return ok(data) as Result<T, E>
    } catch (error) {
      return err(error as E) as Result<T, E>
    }
  }

  // Handle promise
  return Promise.resolve(fn)
    .then((data) => ok(data) as Result<T, E>)
    .catch((error) => err(error as E) as Result<T, E>)
}
