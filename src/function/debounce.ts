// deno-lint-ignore no-explicit-any
type AnyVoidFunction = (...arg: any[]) => void
interface DebounceParams {
  callback: AnyVoidFunction
  timerId?: { id: number }
  delay?: number
}

/**
 * Creates a debounced function that delays invoking the provided callback until
 * after wait milliseconds have elapsed since the last time the debounced
 * function was invoked.
 *
 * @param {DebounceParams} params - The parameters for the debounce function.
 * @returns {AnyVoidFunction} - A new function that debounces the callback.
 *
 * @example
 * ```typescript
 * const debouncedFunction = debounce({ callback: () => console.log('Hello'), delay: 1000 })
 * debouncedFunction() // 'Hello' will be logged after 1 second
 * ```
 */
export const debounce = (params: DebounceParams): AnyVoidFunction => {
  const { callback, timerId = { id: -1 }, delay = 50 } = params

  return (...args) => {
    if (timerId.id !== -1) clearTimeout(timerId.id)

    timerId.id = setTimeout(() => {
      callback.apply(this, args)
    }, delay)
  }
}
