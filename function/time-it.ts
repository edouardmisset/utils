import { type Result, tryCatch } from '@edouardmisset/function'
import { ok } from './ok.ts'
import { err } from './err.ts'

/**
 * Measures the execution time of a synchronous or asynchronous function.
 *
 * @typeParam T Return type of the function.
 * @typeParam Args Argument tuple passed to the function.
 * @typeParam E Error type captured in the Result.
 *
 * @param fn The function to execute and time.
 * @param args Arguments to pass to the function.
 * @returns A promise resolving to a Result with the function outcome and the
 * duration in milliseconds. Errors thrown by `fn` are captured; this function
 * does not throw.
 *
 * @example
 * import { assertEquals } from "@std/assert";
 * // Synchronous example
 * const r1 = await timeIt((a: number, b: number) => a + b, 2, 3);
 * assertEquals(r1.error, undefined);
 * assertEquals(r1.data, 5);
 * assertEquals(typeof r1.duration, "number");
 *
 * @example
 * import { assertEquals } from "@std/assert";
 * // Asynchronous example
 * const r2 = await timeIt(async (n: number) => n * 2, 21);
 * assertEquals(r2.error, undefined);
 * assertEquals(r2.data, 42);
 * assertEquals(typeof r2.duration, "number");
 */
export async function timeIt<T, Args extends unknown[], E = Error>(
  fn: (...args: Args) => Promise<T>,
  ...args: Args
): Promise<TimeResult<T, E>>
/** Synchronous overload. Returns a Promise resolving to the timed Result. */
export async function timeIt<T, Args extends unknown[], E = Error>(
  fn: (...args: Args) => T,
  ...args: Args
): Promise<TimeResult<T, E>>
export async function timeIt<T, Args extends unknown[], E = Error>(
  fn: (...args: Args) => T | Promise<T>,
  ...args: Args
): Promise<TimeResult<T, E>> {
  const start = Date.now()
  try {
    const maybe = fn(...args)
    if (maybe instanceof Promise) {
      const result = await tryCatch<T, E>(maybe)
      return { ...result, duration: Date.now() - start }
    }
    return { ...ok(maybe), duration: Date.now() - start }
  } catch (e) {
    return { ...err(e as E), duration: Date.now() - start }
  }
}

/**
 * {@link Result} type with execution duration in milliseconds.
 */
export type TimeResult<T, E = Error> = Result<T, E> & {
  duration: number
}
