import type { FindByParams, ObjectOfType } from '@edouardmisset/type'

/**
 * Find the first object in an array that matches a given value.
 *
 * The function accepts a single parameter object with three properties:
 * - array: the array to search
 * - keyOrFunction: either a key to read on each object or a function that
 *   receives the object and returns the value to compare
 * - value: the value to match
 *
 * If the object's key doesn't exist the comparison returns undefined.
 *
 * @template Object_ - The type of the objects in the array.
 * @template Key - A key of Object_ to use when keyOrFunction is a key.
 * @template Value - The expected type of the value at Object_[Key].
 *
 * @param {Object} params - Parameter object.
 * @param {Object_[]} params.array - Array of objects to search.
 * @param {Key|((o: Object_) => unknown)} params.keyOrFunction - Key to compare
 * or a function returning the value to compare.
 * @param {Value} params.value - Value to match.
 * @returns {Object_|undefined} The first matching object, or undefined if none
 * matched.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const objects = [
 *   { id: 1, name: 'First' },
 *   { id: 2, name: 'Second' },
 *   { id: 3, name: 'Third' },
 * ]
 *
 * const result = findBy({ array: objects, keyOrFunction: 'id', value: 1 })
 *
 * assertEquals(result, { id: 1, name: 'First' })
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const objects = [{ id: 1, name: 'First' }, { id: 2, name: 'Second' }, { id: 3, name: 'Third' }]
 *
 * const result = findBy({ array: objects, keyOrFunction: o => o.name, value: 'Second' })
 *
 * assertEquals(result, { id: 2, name: 'Second' })
 * ```
 */
export function findBy<
  Object_ extends ObjectOfType<unknown>,
  Key extends keyof Object_,
  Value extends Object_[Key],
>(
  { array, keyOrFunction, value }: FindByParams<Object_, Key, Value>,
): Object_ | undefined {
  const isFunction = typeof keyOrFunction === 'function'
  return array.find((object_) => {
    const valueToCompare = isFunction
      ? keyOrFunction(object_)
      : object_[keyOrFunction]
    return valueToCompare === value
  })
}
