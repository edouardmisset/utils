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
 * const selected = selectBy(array, key)
 * console.log(selected) // Outputs: [2, 4]
 * ```
 *
 * @example
 * ```typescript
 * const array = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]
 * const key = 'name'
 * const selected = selectBy(array, key)
 * console.log(selected) // Outputs: ['John', 'Jane']
 * ```
 */
export function selectBy<
  Obj extends Record<string, unknown>,
  Key extends keyof Obj,
>(arr: Obj[], key: Key): Obj[Key][] {
  return arr.flatMap((item) => (Object.hasOwn(item, key) ? [item[key]] : []))
}

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
 * const obj = { id: 1, name: 'John' }
 * console.log(selectById(obj)) // Outputs: 1
 * ```
 *
 * @example
 * ```typescript
 * const selectByName = createSelectBy<{ id: number, name: string }>('name')
 * const obj = { id: 1, name: 'John' }
 * console.log(selectByName(obj)) // Outputs: 'John'
 * ```
 */
export function createSelectBy<
  Obj extends Record<string, unknown>,
  Key extends keyof Obj,
>(key: Key): (item: Obj) => Obj[Key] {
  return (item) => item[key]
}

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
 * const transformed = selectAndTransform(array, key, value => value * 2)
 * console.log(transformed) // Outputs: [4, 8]
 * ```
 *
 * @example
 * ```typescript
 * const array = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]
 * const key = 'name'
 * const transformed = selectAndTransform(array, key, name => name.toUpperCase())
 * console.log(transformed) // Outputs: ['JOHN', 'JANE']
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
