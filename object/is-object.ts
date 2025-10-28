import { type ObjectOfType } from '@edouardmisset/type'

/**
 * Checks if a given value is an object.
 *
 * **Note**: In JavaScript, `Date`s, `Array`s and other data structures are also
 * considered objects.
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
