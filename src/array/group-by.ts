/**
 * Groups an array of objects by a specific key.
 *
 * @template Obj - The type of the objects in the array, which must extend `Record<string, unknown>`.
 * @template Key - The type of the key of the object.
 * @template Value - The type of the value of the key in the object.
 * @template GroupedObject - The type of the object that groups the array, which must extend `Record<Value, Obj[]>`.
 * @param {Obj[]} arr - The array of objects to group.
 * @param {Key} key - The key to group the objects by.
 * @returns {GroupedObject} - An object that groups the array by the specified key.
 *
 * @example
 * ```typescript
 * const objects = [{ id: 1, name: 'Object 1' }, { id: 2, name: 'Object 2' }, { id: 1, name: 'Object 3' }]
 * const grouped = groupBy(objects, 'id')
 * // Returns { '1': [{ id: 1, name: 'Object 1' }, { id: 1, name: 'Object 3' }], '2': [{ id: 2, name: 'Object 2' }] }
 * ```
 */
export function groupBy<
  Obj extends Record<string, unknown>,
  Key extends keyof Obj,
  Value extends Obj[Key] & (string | number),
  GroupedObject extends Record<Value, Obj[]>,
>(
  arr: Obj[],
  key: Key,
): GroupedObject {
  return arr.reduce(
    (grouped, element) =>
      Object.assign(grouped, {
        [element[key] as Value]: [
          ...(grouped[element[key] as Value] || []),
          element,
        ],
      }),
    {} as GroupedObject,
  )
}
