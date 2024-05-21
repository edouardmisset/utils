import { Primitive } from '../type/type-helpers.ts'

/**
 * Checks if a given value is an object.
 *
 * **Note**: `Date`s, `Array`s and other data structures are also considered
 * objects.
 *
 * @param {unknown} val - The value to check.
 * @returns {val is Record<string, unknown>} - Returns `true` if the value is an
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
export function isObject(val: unknown): val is Record<string, unknown> {
  return !!val && typeof val === 'object'
}

/**
 * Checks if a given value is a plain object.
 *
 * A plain object in JavaScript is an object that is created by the `Object`
 * constructor.
 *
 * @param {unknown} val - The value to check.
 * @returns {val is Record<string, unknown>} - Returns `true` if the value is a
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
export function isPlainObject(val: unknown): val is Record<string, unknown> {
  return !!val &&
    typeof val === 'object' &&
    Object.getPrototypeOf(val) === Object.prototype
}

/**
 * Checks if a given object is not nested.
 *
 * A non-nested object in JavaScript is an object that does not contain any
 * other objects as values.
 *
 * @param {Record<string, unknown>} obj - The object to check.
 * @returns {obj is Record<string, Primitive>} - Returns `true` if the object is not nested, else `false`.
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
  obj: Record<string, unknown>,
): obj is Record<string, Primitive> {
  return Object.values(obj).every((val) => !isObject(val))
}
