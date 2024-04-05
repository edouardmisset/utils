/**
 * Selects a specific key from each object in an array.
 *
 * @template Obj - The type of the objects in the array.
 * @template Key - The type of the key to select from the objects.
 * @param {Obj[]} arr - The array of objects.
 * @param {Key} key - The key to select from each object.
 * @returns {Array<Obj[Key]>} - An array of the selected properties.
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
  Obj extends Record<string, unknown>,
  Key extends keyof Obj,
>(arr: Obj[], key: Key): Obj[Key][] {
  return arr.flatMap((item) => (Object.hasOwn(item, key) ? [item[key]] : []))
}

/**
 * Alias for the {@link selectBy} function.
 */
export const pluckBy: typeof selectBy = selectBy

/**
 * Creates a function that selects a specific key's value from a given object.
 *
 * @template Obj - The type of the object.
 * @template Key - The type of the key to select.
 * @param {Key} key - The key to select.
 * @returns {function} A function that takes an object and returns the value of the selected key.
 *
 * @example
 * ```typescript
 * const selectById = createSelectBy<{ id: number, name: string }>('id')
 * selectById({ id: 1, name: 'John' })
 * // returns 1
 * ```
 *
 * @example
 * ```typescript
 * const selectByName = createSelectBy<{ id: number, name: string }>('name')
 * selectByName({ id: 1, name: 'John' })
 * // returns 'John'
 * ```
 */
export function createSelectBy<
  Obj extends Record<string, unknown>,
  Key extends keyof Obj,
>(key: Key): (obj: Obj) => Obj[Key] {
  return (obj) => obj[key]
}

/**
 * Alias for the {@link selectBy} function.
 */
export const buildSelectBy: typeof createSelectBy = createSelectBy

/**
 * Applies a transformation function to the values a specified by a key of each object in an array.
 *
 * @template Obj - The type of the objects in the array.
 * @template Key - The type of the key to select from the objects.
 * @template R - The type of the result of the transformation function.
 * @param {Obj[]} arr - The array of objects.
 * @param {Key} key - The key to select from each object.
 * @param {(value: Obj[Key]) => R} transform - The transformation function to apply to each selected key.
 * @returns {Array<R>} - An array of the transformed properties.
 *
 * @example
 * ```typescript
 * const array = [{ a: 1, b: 2 }, { a: 3, b: 4 }]
 * const key = 'b'
 * selectAndTransform(array, key, value => value * 2)
 * // returns [4, 8]
 * ```
 *
 * @example
 * ```typescript
 * const array = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]
 * const key = 'name'
 * selectAndTransform(array, key, name => name.toUpperCase())
 * // returns ['JOHN', 'JANE']
 * ```
 */
export function selectAndTransform<
  Obj extends Record<string, unknown>,
  Key extends keyof Obj,
  R,
>(arr: Obj[], key: Key, transform: (value: Obj[Key]) => R): R[] {
  return arr.flatMap(
    (item) => (Object.hasOwn(item, key) ? [transform(item[key])] : []),
  )
}

/**
 * Alias for the {@link selectAndTransform} function.
 */
export const pluckAndMap: typeof selectAndTransform = selectAndTransform
