import { type ObjectOfType } from '@edouardmisset/type'

/**
 * Checks if a given value is a plain object.
 *
 * A plain object in JavaScript is an object that is created by the `Object`
 * constructor or using object literal syntax (i.e., `{}`).
 *
 * @param {unknown} value - The value to check.
 * @returns {value is ObjectOfType<unknown>} - Returns `true` if the value is a
 * plain object, else `false`.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * assertEquals(isPlainObject({}), true)
 * assertEquals(isPlainObject({ a: 1 }), true)
 * assertEquals(isPlainObject([]), false)
 * assertEquals(isPlainObject(null), false)
 * assertEquals(isPlainObject('Hello, world!'), false)
 * ```
 */
export function isPlainObject(
  value: unknown,
): value is ObjectOfType<unknown> {
  return !!value &&
    typeof value === 'object' &&
    Object.getPrototypeOf(value) === Object.prototype
}
