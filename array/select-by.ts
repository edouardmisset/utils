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
  Object_ extends Record<string, unknown>,
  Key extends keyof Object_,
>(array: Object_[], key: Key): Object_[Key][] {
  return array.flatMap((item) => (Object.hasOwn(item, key) ? [item[key]] : []))
}

/**
 * Alias for the {@link selectBy} function.
 */
export const pluckBy: typeof selectBy = selectBy

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
  Object_ extends Record<string, unknown>,
  Key extends keyof Object_,
>(key: Key): (object_: Object_) => Object_[Key] {
  return (object_) => object_[key]
}

/**
 * Alias for the {@link selectBy} function.
 */
export const buildSelectBy: typeof createSelectBy = createSelectBy

/**
 * Applies a transformation function to the values a specified by a key of each object in an array.
 *
 * @template Object_ - The type of the objects in the array.
 * @template Key - The type of the key to select from the objects.
 * @template R - The type of the result of the transformation function.
 * @param {Object_[]} array - The array of objects.
 * @param {Key} key - The key to select from each object.
 * @param {(value: Object_[Key]) => R} transform - The transformation function to apply to each selected key.
 * @returns {Array<R>} - An array of the transformed properties.
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
  Object_ extends Record<string, unknown>,
  Key extends keyof Object_,
  R,
>(array: Object_[], key: Key, transform: (value: Object_[Key]) => R): R[] {
  return array.flatMap(
    (item) => (Object.hasOwn(item, key) ? [transform(item[key])] : []),
  )
}

/**
 * Alias for the {@link selectAndTransform} function.
 */
export const pluckAndMap: typeof selectAndTransform = selectAndTransform
