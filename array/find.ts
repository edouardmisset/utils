import type { ObjectOfType } from '@edouardmisset/type'

/**
 * Creates a function that can be used to find an object in an array by a
 * specific key-value pair.
 * The returned function will return false if the key doesn't exist rather than
 * throwing an error.
 *
 * @template Object_ - The type of the object.
 * @param {keyof Object_} key - The key to match in the objects.
 * @returns {(value: unknown) => (object_: Object_) => boolean} - A function
 * that takes a value and returns a function that takes an object and returns
 * true if the object's key matches the value, false otherwise (including when
 * the key doesn't exist).
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
export function createFindBy<Object_ extends ObjectOfType<unknown>>(
  key: keyof Object_,
): (value: unknown) => (object_: Object_) => boolean {
  return (value) => (object_) => {
    // Return false instead of throwing if key doesn't exist
    if (!Object.hasOwn(object_, key)) {
      return false
    }

    return object_[key] === value
  }
}

/**
 * Alias for the {@link createFindBy} function.
 */
export const buildFindBy: typeof createFindBy = createFindBy
