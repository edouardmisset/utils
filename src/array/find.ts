/**
 * Creates a function that can be used to find an object in an array by a specific key-value pair.
 *
 * @template Obj - The type of the object.
 * @param {keyof Obj} key - The key to match in the objects.
 * @returns {(value: unknown) => (obj: Obj) => boolean} - A function that takes a value and returns a function that takes an object and returns true if the object's key matches the value, false otherwise.
 *
 * @example
 * ```typescript
 * const findById = createFindBy('id')
 * const objects = [{ id: 1, name: 'Object 1' }, { id: 2, name: 'Object 2' }]
 * const findObject = findById(1)
 * const result = objects.find(findObject) // { id: 1, name: 'Object 1' }
 * ```
 *
 * @example
 * ```typescript
 * const findByName = createFindBy('name')
 * const objects = [{ id: 1, name: 'Object 1' }, { id: 2, name: 'Object 2' }]
 * const findObject = findByName('Object 2')
 * const result = objects.find(findObject) // { id: 2, name: 'Object 2' }
 * ```
 */
export function createFindBy<Obj extends Record<string, unknown>>(
  key: keyof Obj,
): (value: unknown) => (obj: Obj) => boolean {
  return (value) => (obj) => {
    if (!Object.hasOwn(obj, key)) {
      throw new Error(`Key "${String(key)}" does not exist in the object.`)
    }

    return obj[key] === value
  }
}
