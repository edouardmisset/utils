import type { ObjectOfType } from '@edouardmisset/type'

/**
 * Selects a specific key from each object in an array.
 *
 * @template Object_ - The type of the objects in the array.
 * @template Key - The type of the key to select from the objects.
 * @param {Object_[]} array - The array of objects.
 * @param {Key} key - The key to select from each object.
 * @returns {Array<Object_[Key]>} - An array of the selected properties.
 *
 * @example
 * ```typescript
 * const array = [{ a: 1, b: 2 }, { a: 3, b: 4 }]
 * const key = 'b'
 * selectBy(array, key)
 * // returns [2, 4]
 * ```
 *
 * @example
 * ```typescript
 * const array = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]
 * const key = 'name'
 * selectBy(array, key)
 * // returns ['John', 'Jane']
 * ```
 */
export function selectBy<
  Object_ extends ObjectOfType<unknown>,
  Key extends keyof Object_,
>(array: Object_[], key: Key): Object_[Key][] {
  return array.flatMap((item) => (Object.hasOwn(item, key) ? [item[key]] : []))
}

/**
 * Alias for the {@link selectBy} function.
 */
export const pluckBy: typeof selectBy = selectBy
// Note: createSelectBy and selectAndTransform moved to their own files.
