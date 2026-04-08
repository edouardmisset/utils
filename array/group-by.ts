import type { ObjectOfType } from '@edouardmisset/type'

/**
 * Groups an array of objects by a specific key.
 *
 * @deprecated Deprecated and scheduled for removal in v6, native grouping should be preferred.
 *
 * Migration (native):
 * ```typescript
 * const grouped = Object.groupBy(objects, (object_) => String(object_.id))
 * ```
 *
 * API availability:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy#browser_compatibility
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy
 *
 * @template Object_ - The type of the objects in the array, which must extend
 * `Record<string, unknown>`.
 * @template Key - The type of the key of the object.
 * @template Value - The type of the value of the key in the object.
 * @template GroupedObject - The type of the object that groups the array, which
 * must extend `Record<Value, Object_[]>`.
 * @param {Object_[]} array - The array of objects to group.
 * @param {Key} key - The key to group the objects by.
 * @returns {GroupedObject} - An object that groups the array by the specified key.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const objects = [{ id: 1, name: 'Object 1' }, { id: 2, name: 'Object 2' }, { id: 1, name: 'Object 3' }]
 * const grouped = groupBy(objects, 'id')
 * assertEquals(grouped, { '1': [{ id: 1, name: 'Object 1' }, { id: 1, name: 'Object 3' }], '2': [{ id: 2, name: 'Object 2' }] })
 * ```
 */
export function groupBy<
  Object_ extends ObjectOfType<unknown>,
  Key extends keyof Object_,
  Value extends Object_[Key] & (string | number),
  GroupedObject extends Record<Value, Object_[]>,
>(
  array: Object_[],
  key: Key,
): GroupedObject {
  return array.reduce(
    (grouped, element) => {
      const value = element[key] as Value
      if (!grouped[value]) {
        grouped[value] = [] as unknown as GroupedObject[Value]
      }

      grouped[value].push(element)
      return grouped
    },
    {} as GroupedObject,
  )
}
