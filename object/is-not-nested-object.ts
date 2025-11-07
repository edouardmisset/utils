import type { ObjectOfType, Primitive } from '@edouardmisset/type'
import { isObject } from './is-object.ts'

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
