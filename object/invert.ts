/**
 * Inverts the keys and values of an object.
 *
 * The original object's keys should be strings or numbers. The values of the
 * original should be serializable and of type : `string`, `number` or `symbol`.
 * The values of the original object will become the keys of the new object, and
 * the keys of the original object will become the values of the new object.
 *
 * **Note**: If the original object has duplicate values, the resulting inverted
 * object will override previous keys, as object keys must be unique. The key
 * retained in the inverted object will be the one that appears last in the
 * original object.
 *
 * This function can be useful when you need to reverse a mapping, or when you
 * need to look up keys by their associated values.
 *
 * @template Object_ - An object with string or number keys.
 * @template Key - The keys of the object T.
 * @template Return - The inverted object.
 *
 * @param {Object_} object - The original object to invert.
 * @returns {Return} The new object with inverted keys and values.
 *
 * @example
 * ```typescript
 * invert({ a: '1', b: '2' })
 * // returns { '1': 'a', '2': 'b' }
 * ```
 *
 * @example
 * ```typescript
 * invert({ a: '1', b: '1' })
 * // returns { '1': 'b' } - 'a' is overridden by 'b'
 * ```
 */
export function invert<
  Object_ extends Record<string, unknown>,
  Key extends keyof Object_,
  Result extends Record<string, Key>,
>(
  object: Object_,
): Result {
  return Object.entries(object).reduce((acc, [key, value]) => {
    if (!['string', 'number', 'symbol'].includes(typeof value)) {
      return acc
    }

    Object.assign(acc, { [String(value)]: key })
    return acc
  }, {} as Result)
}
