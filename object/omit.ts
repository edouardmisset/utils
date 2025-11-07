import type { ObjectOfType } from '@edouardmisset/type'

/**
 * Omits the specified keys from an object and returns a new object without these
 * keys.
 *
 * @template Object_ - The type of the object.
 * @template Key - The type of the keys to omit.
 * @param {Object_} object - The object to omit keys from.
 * @param {Key[]} keys - The array of keys to omit.
 * @returns {Omit<Object_, Key>} A new object with the omitted keys.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Omit specific keys
 * const object = { name: 'John', age: 30, city: 'New York' }
 * assertEquals(omit(object, ['name', 'city']), { age: 30 })
 * ```
 */
export function omit<
  Object_ extends ObjectOfType<unknown>,
  Key extends keyof Object_,
>(
  object: Object_,
  keys: Key[],
): Omit<Object_, Key> {
  const keysToOmit = new Set(keys)
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !keysToOmit.has(key as Key)),
  ) as Omit<Object_, Key>
}
