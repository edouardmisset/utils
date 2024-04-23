import type { Prettify } from '../type/type-helpers.ts'

/**
 * Omits the specified keys from an object and returns a new object without these
 * keys.
 *
 * @template Obj - The type of the object.
 * @template Key - The type of the keys to omit.
 * @param {Obj} obj - The object to omit keys from.
 * @param {Key[]} keys - The array of keys to omit.
 * @returns {Prettify<Omit<Obj, Key>>} A new object with the omitted keys.
 *
 * @example
 * ```typescript
 * const obj = { name: 'John', age: 30, city: 'New York' }
 * omit(obj, ['name', 'city'])
 * // returns { age: 30 }
 * ```
 */
export function omit<
  Obj extends Record<string, unknown>,
  Key extends keyof Obj,
>(
  obj: Obj,
  keys: Key[],
): Prettify<Omit<Obj, Key>> {
  const keysToOmit = new Set(keys)
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keysToOmit.has(key as Key)),
  ) as Prettify<Omit<Obj, Key>>
}
