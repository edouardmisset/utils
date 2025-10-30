import type { ByParameters, ObjectOfType } from '@edouardmisset/type'

/**
 * Filter all objects in an array whose selected value strictly equals the
 * provided value.
 *
 * Accepts a single parameter object with:
 * - array: the array to filter
 * - keyOrFunction: a key of each object or a function mapping the object to the
 *   value to compare
 * - value: the value to match (using `===`)
 *
 * Edge cases / notes:
 * - If the key is missing on an object its value is `undefined` for comparison.
 * - A match on `undefined` is possible if you explicitly pass `value: undefined`.
 * - Comparison is a plain strict equality (no deep comparison, no coercion).
 *
 * @template Object_ - Type of the objects in the input array.
 * @template Key - Key of Object_ used when keyOrFunction is a string key.
 * @template Value - Type of the value being compared (Object_[Key]).
 *
 * @param {Object} params - Parameter object.
 * @param {Object_[]} params.array - Array of objects to filter.
 * @param {Key|((o: Object_) => unknown)} params.keyOrFunction - Key whose value is compared,
 * or a function receiving the object and returning the value to compare.
 * @param {Value} params.value - Value to match with strict equality.
 * @returns {Object_[]} Array of all matching objects (empty if no match).
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const objects = [
 *   { id: 1, category: 'a' },
 *   { id: 2, category: 'b' },
 *   { id: 3, category: 'a' },
 * ]
 *
 * const result = filterBy({ array: objects, keyOrFunction: 'category', value: 'a' })
 *
 * assertEquals(result, [
 *   { id: 1, category: 'a' },
 *   { id: 3, category: 'a' },
 * ])
 * ```
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
 * // Using a mapping function instead of a key
 * const result = filterBy({ array: objects, keyOrFunction: o => o.name.length, value: 5 })
 *
 * assertEquals(result, [
 *   { id: 1, name: 'First' },
 *   { id: 3, name: 'Third' },
 * ])
 * ```
 */
export function filterBy<
  Object_ extends ObjectOfType<unknown>,
  Key extends keyof Object_,
  Value extends Object_[Key],
>(
  { array, keyOrFunction, value }: ByParameters<Object_, Key, Value>,
): Object_[] {
  const isFunction = typeof keyOrFunction === 'function'
  return array.filter((object_) => {
    const valueToCompare = isFunction
      ? keyOrFunction(object_)
      : object_[keyOrFunction]
    return valueToCompare === value
  })
}
