import { type ObjectOfType } from '@edouardmisset/type'

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
export function isObject(value: unknown): value is ObjectOfType<unknown> {
  return !!value && typeof value === 'object'
}

// Note: isPlainObject and isNotNestedObject have been moved to
// `is-plain-object.ts` and `is-not-nested-object.ts` respectively.
