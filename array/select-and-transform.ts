import type { ObjectOfType } from '@edouardmisset/type'

/**
 * Applies a transformation function to the values a specified by a key of each object in an array.
 *
 * @template Object_ - The type of the objects in the array.
 * @template Key - The type of the key to select from the objects.
 * @template Result - The type of the result of the transformation function.
 * @param {Object_[]} array - The array of objects.
 * @param {Key} key - The key to select from each object.
 * @param {(value: Object_[Key]) => Result} transform - The transformation function to apply to each selected key.
 * @returns {Array<Result>} - An array of the transformed properties.
 *
 * @example
 * ```typescript
 * const array = [{ a: 1, b: 2 }, { a: 3, b: 4 }]
 * selectAndTransform(array, 'b', value => value * 2)
 * // returns [4, 8]
 * ```
 *
 * @example
 * ```typescript
 * const array = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]
 * selectAndTransform(array, 'name', name => name.toUpperCase())
 * // returns ['JOHN', 'JANE']
 * ```
 */
export function selectAndTransform<
  Object_ extends ObjectOfType<unknown>,
  Key extends keyof Object_,
  Result,
>(
  array: Object_[],
  key: Key,
  transform: (value: Object_[Key]) => Result,
): Result[] {
  return array.flatMap(
    (item) => (Object.hasOwn(item, key) ? [transform(item[key])] : []),
  )
}

/**
 * Alias for the {@link selectAndTransform} function.
 */
export const pluckAndMap: typeof selectAndTransform = selectAndTransform