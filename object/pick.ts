import type { ObjectOfType } from '@edouardmisset/type'

/**
 * Picks the specified keys from an object and returns a new object with these keys.
 *
 * @template Object_ - The type of the object.
 * @template Key - The type of the keys to pick.
 * @param {Object_} object - The object to pick keys from.
 * @param {Key[]} keys - The array of keys to pick.
 * @returns {Pick<Object_, Key>} A new object with the picked keys.
 *
 * @example
 * ```typescript
 * const object = { name: 'John', age: 30, city: 'New York' }
 * pick(object, ['name', 'city'])
 * // returns { name: 'John', city: 'New York' }
 * ```
 */
export function pick<
  Object_ extends ObjectOfType<unknown>,
  Key extends keyof Object_,
>(
  object: Object_,
  keys: Key[],
): Pick<Object_, Key> {
  return Object.fromEntries(keys.map((key) => [key, object[key]])) as Pick<
    Object_,
    Key
  >
}
