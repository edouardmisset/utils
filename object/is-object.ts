import { Primitive } from '@edouardmisset/type'

/**
 * Checks if a given value is an object.
 *
 * **Note**: `Date`s, `Array`s and other data structures are also considered
 * objects.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is Record<string, unknown>} - Returns `true` if the value is an
 * object, else `false`.
 *
 * @example
 * ```typescript
 * isObject({})
 * // returns true
 * isObject({ a: 1 })
 * // returns true
 * isObject([])
 * // returns true
 * isObject('Hello, world!')
 * // returns false
 * ```
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object'
}

/**
 * Checks if a given value is a plain object.
 *
 * A plain object in JavaScript is an object that is created by the `Object`
 * constructor.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is Record<string, unknown>} - Returns `true` if the value is a
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
): value is Record<string, unknown> {
  return !!value &&
    typeof value === 'object' &&
    Object.getPrototypeOf(value) === Object.prototype
}

/**
 * Checks if a given object is not nested.
 *
 * A non-nested object in JavaScript is an object that does not contain any
 * other objects as values.
 *
 * @param {Record<string, unknown>} object - The object to check.
 * @returns {object is Record<string, Primitive>} - Returns `true` if the object is not nested, else `false`.
 *
 * @example
 * ```typescript
 * isNotNestedObject({ a: 1, b: '2', c: null })
 * // returns true
 * isNotNestedObject({ a: 1, b: { c: 2 } })
 * // returns false
 * ```
 */
export function isNotNestedObject(
  object: Record<string, unknown>,
): object is Record<string, Primitive> {
  return Object.values(object).every((value) => !isObject(value))
}
