import type { AnyVoidFunction } from '@edouardmisset/type'

/**
 * Parameters for the debounce function.
 */
interface DebounceParameters {
  /**
   * The function to debounce.
   */
  callback: AnyVoidFunction
  /**
   * The delay in milliseconds before invoking the callback. Defaults to 50.
   */
  delay?: number
  /**
   * An optional object to store the timer ID, allowing external control or
   * cancellation.
   */
  timerId?: { id: number }
}

/**
 * Creates a debounced function that delays invoking the provided callback until
 * after wait 'delay' milliseconds have elapsed since the last time the debounced
 * function was invoked.
 *
 * @param {DebounceParameters} parameters - The parameters for the debounce function.
 * @returns {AnyVoidFunction} - A new function that debounces the callback.
 *
 * @example
 * ```typescript
 * // Create a debounced function
 * const debouncedFunction = debounce({ callback: () => console.log('Hello'), delay: 1000 })
 *
 * // Note: In actual usage, call the function and it will execute after the delay
 * // debouncedFunction() // 'Hello' will be logged after 1000ms
 * ```
 */
export const debounce = (parameters: DebounceParameters): AnyVoidFunction => {
  const { callback, delay = 50, timerId = { id: -1 } } = parameters

  return (...arguments_: unknown[]) => {
    if (timerId.id !== -1) clearTimeout(timerId.id)

    timerId.id = setTimeout(() => {
      callback.apply(this, arguments_)
    }, delay)
  }
}
