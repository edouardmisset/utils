/**
 * Updates an object in an array in an immutable way.
 *
 * **Notes**:
 * - This function assumes that the `key` is unique across all objects in the
 * array.
 * - If there are multiple objects with the same `key` value, this function
 * will update all of them, which might not be the intended behavior.
 * - If the `key`'s values do not match, the function will not update any
 *   objects.
 *
 * @param {T[]} array - The original array.
 * @param {keyof T} key - The key of the object to be updated.
 * @param {Partial<T>} newData - The new data to be updated.
 * @throws {Error} - If the `key` does not exist in `newData`.
 * @returns {T[]} - A new array with the specified object updated.
 *
 * @example
 * ```ts
 * const input = [
 *   { id: 1, name: 'John' },
 *   { id: 2, name: 'Jane' },
 * ]
 *
 * updateObjectInArray(input, 'id', { id: 1, name: 'Johnny' })
 * // returns [{ id: 1, name: 'Johnny' },{ id: 2, name: 'Jane' }]
 * ```
 */
export const updateObjectInArray = <T extends object>(
  array: T[],
  key: keyof T,
  newData: Partial<T>,
): T[] => {
  if (newData[key] === undefined) {
    throw new Error(`The key ${key.toString()} does not exist in newData`)
  }
  return array.map((object) =>
    object[key] === newData[key] ? { ...object, ...newData } : object
  )
}

/**
 * Alias for the {@link updateObjectInArray} function.
 */
export const updateArray: typeof updateObjectInArray = updateObjectInArray