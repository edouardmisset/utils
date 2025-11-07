import type { AnyVoidFunction, CallbackAndDelay } from '@edouardmisset/type'

/**
 * Creates a throttled function that only invokes the provided callback at most
 * once per every 'delay' milliseconds.
 *
 * @param {CallbackAndDelay} parameters - The parameters for the throttle function.
 * @returns {AnyVoidFunction} - A new function that throttles the callback.
 *
 * @example
 * ```typescript
 * import { assert } from '@std/assert'
 *
 * // Create a throttled function
 * let callCount = 0
 * const throttledFunction = throttle({
 *   callback: () => { callCount++ },
 *   delay: 100
 * })
 *
 * throttledFunction() // First call executes immediately
 * assert(callCount === 1)
 * throttledFunction() // Second call is throttled
 * assert(callCount === 1)
 * ```
 */
export const throttle = (parameters: CallbackAndDelay): AnyVoidFunction => {
  const { callback, delay = 100 } = parameters

  let lastCalled = 0
  return (...arguments_) => {
    const now = new Date().getTime()
    if (now - lastCalled < delay) return

    lastCalled = now
    return callback.apply(this, arguments_)
  }
}
