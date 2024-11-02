import { ObjectOfType } from '../mod.ts'
import { objectKeys } from './object-keys.ts'

/**
 * Performs a shallow comparison between two objects of the same type.
 * It checks if both objects have the same keys and if the values for these keys are the same in both objects.
 *
 * @template Object_ The type of the objects to compare.
 * @param {Object_} leftObject The first object to compare.
 * @param {Object_} rightObject The second object to compare.
 * @returns {boolean} True if the objects have the same keys and the same values for each key, false otherwise.
 *
 * @example
 * ```typescript
 * const object1 = { a: 1, b: 2 }
 * const object2 = { b: 2, a: 1 }
 * const object3 = { a: 1, b: 3 }
 * shallowEqual(object1, object2)
 * // returns true
 * shallowEqual(object1, object3)
 * // returns false
 * ```
 */
export function shallowEqual<Object_ extends ObjectOfType>(
  leftObject: Object_,
  rightObject: Object_,
): boolean {
  const leftKeys = objectKeys(leftObject).sort()
  const rightKeys = objectKeys(rightObject).sort()

  if (leftKeys.length !== rightKeys.length) return false

  return leftKeys.every(
    (key, index) =>
      key === rightKeys[index] && leftObject[key] === rightObject[key],
  )
}
