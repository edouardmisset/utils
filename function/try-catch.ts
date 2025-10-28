import { isFunction } from '@edouardmisset/function'

/**
 * Wraps a function or promise and returns a Result with either data or error.
 * Avoids writing explicit try/catch around sync or async code.
 *
 * @typeParam T Data type when successful.
 * @typeParam E Error type when failed (default Error).
 *
 * @param fn Synchronous function to invoke inside a try/catch.
 * @returns Result with `data` on success or `error` on failure.
 *
 * @example
 * ```typescript
 * import { assertEquals } from "@std/assert";
 *
 * const syncOk = tryCatch(() => JSON.parse('{"valid": true}'));
 * assertEquals(syncOk.error, undefined);
 * assertEquals(syncOk.data?.valid, true);
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from "@std/assert";
 *
 * const syncErr = tryCatch(() => JSON.parse('invalid'));
 * assertEquals(syncErr.data, undefined);
 * assertEquals(syncErr.error instanceof SyntaxError, true);
 * ```
 */
export function tryCatch<T, E = Error>(
  fn: () => T,
): Result<T, E>
/** Promise overload. Wraps a Promise and resolves to a Result. */
export function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>>
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

/** Result type for successful operations. */
export type Success<T> = { data: T; error: undefined }
/** Result type for failed operations. */
export type Failure<E> = { data: undefined; error: E }
/** Union type representing a result that can be either successful or failed. */
export type Result<T, E = Error> = Success<T> | Failure<E>
