/**
 * Memoizes a given function by caching its computed results.
 *
 * @template Function_ - The type of the function to be memoized.
 * @param {Function_} function_ - The function to be memoized.
 * @returns {Function_ & { clearCache: () => void }} - The memoized function with a
 * method to clear the cache.
 *
 * @example
 * ```typescript
 * import { assertEquals } from "@std/assert"
 *
 * // Function to compute factorial
 * function factorial(n: number): number {
 *   if (n <= 1) return 1
 *   return n * factorial(n - 1)
 * }
 *
 * // Memoized version of the factorial function
 * const memoizedFactorial = memoize(factorial)
 *
 * assertEquals(memoizedFactorial(5), 120) // computed
 * assertEquals(memoizedFactorial(5), 120) // cached
 * ```
 */
// deno-lint-ignore no-explicit-any
export function memoize<Function_ extends (...arguments_: any[]) => any>(
  function_: Function_,
): Function_ & { clearCache: () => void } {
  const cache = new Map<string, ReturnType<Function_>>()

  const memoizedFunction = ((...arguments_: Parameters<Function_>) => {
    const key = arguments_.length === 0 ? '__noArguments___' : JSON.stringify(arguments_)

    if (!cache.has(key)) {
      cache.set(key, function_(...arguments_))
    }
    return cache.get(key)
  }) as Function_ & { clearCache: () => void }

  memoizedFunction.clearCache = () => {
    cache.clear()
  }

  return memoizedFunction
}

/** Alias for the {@link memoize} function. */
export const memo: typeof memoize = memoize
