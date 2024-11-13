/**
 * Memoizes a given function by caching its computed results.
 *
 * @template Fct - The type of the function to be memoized.
 * @param {Fct} fn - The function to be memoized.
 * @returns {Fct & { clearCache: () => void }} - The memoized function with a
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
export function memoize<Fct extends (...args: any[]) => any>(
  fn: Fct,
): Fct & { clearCache: () => void } {
  const cache = new Map<string, ReturnType<Fct>>()

  const memoizedFn = ((...args: Parameters<Fct>) => {
    const key = args.length === 0 ? '__noArgs__' : JSON.stringify(args)

    if (!cache.has(key)) {
      cache.set(key, fn(...args))
    }
    return cache.get(key)
  }) as Fct & { clearCache: () => void }

  memoizedFn.clearCache = () => {
    cache.clear()
  }

  return memoizedFn
}

export const memo = memoize
