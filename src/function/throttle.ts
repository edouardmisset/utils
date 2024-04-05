// deno-lint-ignore no-explicit-any
type AnyVoidFunction = (...arg: any[]) => void
interface ThrottleParams {
  callback: AnyVoidFunction
  delay?: number
}

/**
 * Creates a throttled function that only invokes the provided callback at most
 * once per every wait milliseconds.
 *
 * @param {ThrottleParams} params - The parameters for the throttle function.
 * @returns {AnyVoidFunction} - A new function that throttles the callback.
 *
 * @example
 * ```typescript
 * const throttledFunction = throttle({ callback: () => console.log('Hello'), delay: 1000 })
 * throttledFunction() // 'Hello' will be logged immediately
 * throttledFunction() // 'Hello' will not be logged because the function is throttled
 * ```
 */
export const throttle = (params: ThrottleParams): AnyVoidFunction => {
  const { callback, delay = 100 } = params
  let throttlePause: boolean

  return (...args) => {
    if (throttlePause === true) return

    throttlePause = true
    setTimeout(() => {
      callback.apply(this, args)
      throttlePause = false
    }, delay)
  }
}
