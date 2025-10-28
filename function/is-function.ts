/**
 * Checks if the provided value is a function.
 *
 * @param {unknown} maybeFunction - The value to check.
 * @returns {boolean} Returns `true` if `maybeFunction` is a function, else `false`.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Function is detected
 * assertEquals(isFunction(function() {}), true)
 * assertEquals(isFunction(() => {}), true)
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Non-function values
 * assertEquals(isFunction('not a function'), false)
 * assertEquals(isFunction(null), false)
 * ```
 */
// deno-lint-ignore ban-types
export function isFunction(maybeFunction: unknown): maybeFunction is Function {
  return typeof maybeFunction === 'function'
}
