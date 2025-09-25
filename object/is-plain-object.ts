import { type ObjectOfType } from '@edouardmisset/type'

/**
 * Checks if a given value is a plain object.
 *
 * A plain object in JavaScript is an object that is created by the `Object`
 * constructor.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is ObjectOfType<unknown>} - Returns `true` if the value is a
 * plain object, else `false`.
 *
 * @example
 * ```typescript
 * isPlainObject({})
 * // returns true
 * isPlainObject({ a: 1 })
 * // returns true
 * isPlainObject([])
 * // returns false
 * isPlainObject(null)
 * // returns false
 * isPlainObject('Hello, world!')
 * // returns false
 * ```
 */
export function isPlainObject(
  value: unknown,
): value is ObjectOfType<unknown> {
  return !!value &&
    typeof value === 'object' &&
    Object.getPrototypeOf(value) === Object.prototype
}
