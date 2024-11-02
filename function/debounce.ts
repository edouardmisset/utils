import type { AnyVoidFunction } from '@edouardmisset/type'

interface DebounceParameters {
  callback: AnyVoidFunction
  delay?: number
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
 * const debouncedFunction = debounce({ callback: () => console.log('Hello'), delay: 1000 })
 * debouncedFunction() // 'Hello' will be logged after 1 second
 * ```
 */
export const debounce = (parameters: DebounceParameters): AnyVoidFunction => {
  const { callback, delay = 50, timerId = { id: -1 } } = parameters

  return (...arguments_) => {
    if (timerId.id !== -1) clearTimeout(timerId.id)

    timerId.id = setTimeout(() => {
      callback.apply(this, arguments_)
    }, delay)
  }
}
