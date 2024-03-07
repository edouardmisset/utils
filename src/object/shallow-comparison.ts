import { ObjectType } from '../type/type-helpers.ts'
import { objectKeys } from './object-keys.ts'

/**
 * Performs a shallow comparison between two objects of the same type.
 * It checks if both objects have the same keys and if the values for these keys are the same in both objects.
 *
 * @template Obj The type of the objects to compare.
 * @param {Obj} leftObject The first object to compare.
 * @param {Obj} rightObject The second object to compare.
 * @returns {boolean} True if the objects have the same keys and the same values for each key, false otherwise.
 *
 * @example
 * ```typescript
 * const obj1 = { a: 1, b: 2 }
 * const obj2 = { b: 2, a: 1 }
 * const obj3 = { a: 1, b: 3 }
 * shallowComparison(obj1, obj2)
 * // returns true
 * shallowComparison(obj1, obj3)
 * // returns false
 * ```
 */
export function shallowComparison<Obj extends ObjectType>(
  leftObject: Obj,
  rightObject: Obj,
): boolean {
  const leftKeys = objectKeys(leftObject).sort()
  const rightKeys = objectKeys(rightObject).sort()

  if (leftKeys.length !== rightKeys.length) return false

  return leftKeys.every(
    (key, index) =>
      key === rightKeys[index] && leftObject[key] === rightObject[key],
  )
}

/**
 * Alias for the {@link shallowComparison} function.
 */
export const isEqual = shallowComparison

/**
 * Alias for the {@link shallowComparison} function.
 */
export const shallowEqual = shallowComparison
