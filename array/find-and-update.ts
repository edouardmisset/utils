import type { ObjectOfType } from '@edouardmisset/type'

/**
 * Finds and updates an object in an array in an immutable way.
 *
 * @template Object_ - The type of the objects in the array.
 * @template Key - The type of the key to find the object.
 * @param {Object_[]} array - The array of objects.
 * @param {Key} key - The key to find the object.
 * @param {Object_[Key]} value - The value to match against the key.
 * @param {Partial<Object_>} updates - The updates to apply to the found object.
 * @returns {Object_[]} - The updated array of objects. If no object matches,
 * returns the original array.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const array = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]
 * assertEquals(
 *   findAndUpdate({ array, key: 'id', value: 1, updates: { name: 'Doe' } }),
 *   [{ id: 1, name: 'Doe' }, { id: 2, name: 'Jane' }]
 * )
 * ```
 */
export function findAndUpdate<
  Object_ extends ObjectOfType<unknown>,
  Key extends keyof Object_,
>(
  { array, key, value, updates }: {
    array: Object_[]
    key: Key
    value: Object_[Key]
    updates: Partial<Object_>
  },
): Object_[] {
  return array.map((
    obj,
  ) => (obj?.[key] === value ? { ...obj, ...updates } : obj))
}
