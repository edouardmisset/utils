import { type ObjectOfType, Primitive } from '@edouardmisset/type'

/**
 * Checks if a given value is an object.
 *
 * **Note**: `Date`s, `Array`s and other data structures are also considered
 * objects.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is ObjectOfType<unknown>} - Returns `true` if the value is an
 * object, else `false`.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * assertEquals(isObject({}), true)
 * assertEquals(isObject({ a: 1 }), true)
 * assertEquals(isObject([]), true)
 * assertEquals(isObject('Hello, world!'), false)
 * ```
 */
export function isObject(value: unknown): value is ObjectOfType<unknown> {
  return !!value && typeof value === 'object'
}

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

/**
 * Checks if a given object is not nested.
 *
 * A non-nested object in JavaScript is an object that does not contain any
 * other objects as values.
 *
 * @param {ObjectOfType<unknown>} object - The object to check.
 * @returns {object is ObjectOfType<Primitive>} - Returns `true` if the object is not nested, else `false`.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * assertEquals(isNotNestedObject({ a: 1, b: '2', c: null }), true)
 * assertEquals(isNotNestedObject({ a: 1, b: { c: 2 } }), false)
 * ```
 */
export function isNotNestedObject(
  object: ObjectOfType<unknown>,
): object is ObjectOfType<Primitive> {
  return Object.values(object).every((value) => !isObject(value))
}
