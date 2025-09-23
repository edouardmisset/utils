import { err, ok, type Result, tryCatch } from '@edouardmisset/function'

/**
 * Measures the execution time of a synchronous or asynchronous function.
 *
 * @template T The return type of the function.
 * @template Args The argument types of the function.
 * @param fn - The function to execute and time.
 * @param args - Arguments to pass to the function.
 * @returns An object containing the result (or error) and the duration in
 * milliseconds.
 *
 * @example
 * import { assertEquals, assert } from "@std/assert";
 * // Synchronous example
 * function add(a: number, b: number): number {
 *   return a + b;
 * }
 * const result = await timeIt(add, 2, 3);
 * assert(result.ok);
 * assertEquals(result.value, 5);
 * assert(typeof result.duration === "number");
 *
 * @example
 * import { assert, assertStringIncludes } from "@std/assert";
 * // Asynchronous example
 * async function fetchData(url: string): Promise<string> {
 *   return await fetch(url).then(res => res.text());
 * }
 * const result = await timeIt(fetchData, "https://example.com");
 * assert(result.ok);
 * assert(typeof result.value === "string");
 * assert(typeof result.duration === "number");
 */
export async function timeIt<T, Args extends unknown[], E = Error>(
  fn: (...args: Args) => Promise<T>,
  ...args: Args
): Promise<TimeResult<T, E>>
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
