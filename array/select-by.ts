import type { ObjectOfType } from '@edouardmisset/type'

/**
 * Selects a specific key from each object in an array.
 *
 * @template Object_ - The type of the objects in the array.
 * @template Key - The type of the key to select from the objects.
 * @param {Object_[]} array - The array of objects.
 * @param {Key} key - The key to select from each object.
 * @returns {Object_[Key][]} - An array of the selected values.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const array = [{ a: 1, b: 2 }, { a: 3, b: 4 }]
 * assertEquals(selectBy(array, 'b'), [2, 4])
 * ```
 */
export function selectBy<
  Object_ extends ObjectOfType<unknown>,
  Key extends keyof Object_,
>(
  array: Object_[],
  key: Key,
): Object_[Key][] {
  return array.flatMap((item) => (Object.hasOwn(item, key) ? [item[key]] : []))
}
