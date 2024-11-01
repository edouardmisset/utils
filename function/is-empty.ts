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
 * isEmpty(null) // returns true
 * isEmpty('') // returns true
 * isEmpty('   ') // returns true
 * isEmpty({}) // returns true
 * isEmpty([]) // returns true
 * isEmpty({ a: 1 }) // returns false
 * isEmpty('Hello, world!') // returns false
 * ```
 */
export function isEmpty(value: IterableOrNullish): boolean {
  if (value === null || value === undefined) return true
  return typeof value === 'string'
    ? value.trim().length === 0
    : Object.keys(value).length === 0
}
