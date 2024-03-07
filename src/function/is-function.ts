/**
 * Checks if the provided value is a function.
 *
 * @param {unknown} maybeFunction - The value to check.
 * @returns {boolean} Returns `true` if `maybeFunction` is a function, else `false`.
 *
 * @example
 * isFunction(function() {});
 * // returns true
 *
 * @example
 * isFunction('not a function');
 * // returns false
 */
// deno-lint-ignore ban-types
export const isFunction = (maybeFunction: unknown): maybeFunction is Function =>
  typeof maybeFunction === 'function'
