import { size } from '@edouardmisset/object'

/**
 * A type that represents any iterable value, or a value that is `null` or
 * `undefined`.
 */
export type IterableOrNullish =
  | Record<string, unknown>
  | unknown[]
  | string
  | null
  | undefined

/**
 * Checks if a given value is empty.
 *
 * This function considers a value to be empty if it is `null`, an empty string
 * (or a string that contains only whitespace), or an object with no enumerable
 * properties.
 *
 * If the value is a string, it trims any leading or trailing whitespace before
 * checking its length. If the value is an object, it uses `Object.keys()` to
 * get an array of its own enumerable properties, and then checks the length of
 * that array.
 *
 * **Note** that this function does not consider other falsy values (like `false`,
 * `0`, or `NaN`) to be empty.
 *
 * @param {IterableOrNullish} value - The value to check. This can be any iterable
 * (like an object or an array), a string, or a nullish value (`null` or
 * `undefined`).
 * @returns {boolean} - Returns `true` if the value is considered empty, else
 * `false`.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Empty values
 * assertEquals(isEmpty(null), true)
 * assertEquals(isEmpty(''), true)
 * assertEquals(isEmpty('   '), true)
 * assertEquals(isEmpty({}), true)
 * assertEquals(isEmpty([]), true)
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Non-empty values
 * assertEquals(isEmpty({ a: 1 }), false)
 * assertEquals(isEmpty('Hello, world!'), false)
 * ```
 */
export function isEmpty(value: IterableOrNullish): boolean {
  if (value === null || value === undefined) return true
  return typeof value === 'string'
    ? value.trim().length === 0
    : size(value) === 0
}
