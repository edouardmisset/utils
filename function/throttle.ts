import type { AnyVoidFunction } from '../type/type-helpers.ts'

interface ThrottleParameters {
  callback: AnyVoidFunction
  delay?: number
}

/**
 * Creates a throttled function that only invokes the provided callback at most
 * once per every 'delay' milliseconds.
 *
 * @param {ThrottleParameters} parameters - The parameters for the throttle function.
 * @returns {AnyVoidFunction} - A new function that throttles the callback.
 *
 * @example
 * ```typescript
 * const throttledFunction = throttle({ callback: () => console.log('Hello'), delay: 1000 })
 * throttledFunction() // 'Hello' will be logged immediately
 * throttledFunction() // 'Hello' will not be logged because the function is throttled
 * ```
 */
export const throttle = (parameters: ThrottleParameters): AnyVoidFunction => {
  const { callback, delay = 100 } = parameters

  let lastCalled = 0
  return (...arguments_) => {
    const now = new Date().getTime()
    if (now - lastCalled < delay) return

    lastCalled = now
    return callback.apply(this, arguments_)
  }
}
