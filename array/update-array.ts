import { Result } from '../function/try-catch.ts'

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
 * @returns {Result<T[], Error>} A Result containing either a new array with the specified object updated or an Error if the key does not exist in newData.
 *
 * @example
 * ```typescript
 * const input = [
 *   { id: 1, name: 'John' },
 *   { id: 2, name: 'Jane' },
 * ]
 *
 * const result = updateObjectInArray(input, 'id', { id: 1, name: 'Johnny' })
 * if (result.error) {
 *   console.log('Error:', result.error.message)
 * } else {
 *   console.log(result.data) // [{ id: 1, name: 'Johnny' },{ id: 2, name: 'Jane' }]
 * }
 * ```
 *
 * @example
 * ```typescript
 * const input = [
 *   { id: 1, name: 'John' },
 *   { id: 2, name: 'Jane' },
 * ]
 *
 * // Error case: key not in newData
 * const result = updateObjectInArray(input, 'id', { name: 'Johnny' })
 * if (result.error) {
 *   console.log('Error:', result.error.message) // "The key id does not exist in newData"
 * }
 * ```
 */
export const updateObjectInArray = <T extends object>(
  array: T[],
  key: keyof T,
  newData: Partial<T>,
): Result<T[], Error> => {
  if (newData[key] === undefined) {
    return {
      data: undefined,
      error: new Error(`The key ${key.toString()} does not exist in newData`),
    }
  }
  const result = array.map((object) =>
    object[key] === newData[key] ? { ...object, ...newData } : object
  )
  return {
    data: result,
    error: undefined,
  }
}

/**
 * Alias for the {@link updateObjectInArray} function.
 */
export const updateArray: typeof updateObjectInArray = updateObjectInArray
