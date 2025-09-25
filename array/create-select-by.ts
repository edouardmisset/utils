import type { ObjectOfType } from '@edouardmisset/type'

/**
 * Creates a function that selects a specific key's value from a given object.
 *
 * @template Object_ - The type of the object.
 * @template Key - The type of the key to select.
 * @param {Key} key - The key to select.
 * @returns {function} A function that takes an object and returns the value of the selected key.
 *
 * @example
 * ```typescript
 * const selectById = createSelectBy('id')
 * selectById({ id: 1, name: 'John' })
 * // returns 1
 *
 * const selectByName = createSelectBy('name')
 * selectByName({ id: 1, name: 'John' })
 * // returns 'John'
 * ```
 */
export function createSelectBy<
  Object_ extends ObjectOfType<unknown>,
  Key extends keyof Object_,
>(key: Key): (object_: Object_) => Object_[Key] {
  return (object_) => object_[key]
}

/**
 * Alias for the {@link createSelectBy} function.
 */
export const buildSelectBy: typeof createSelectBy = createSelectBy
