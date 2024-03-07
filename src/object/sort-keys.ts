/**
 * Sorts the keys of an object in lexicographical order and returns a new object
 * with the sorted keys.
 *
 * @template Obj - The type of the object.
 * @param {Obj} obj - The object whose keys are to be sorted.
 * @param {{ ascending?: boolean }} [options={ ascending: true }] - An options
 * object. If `options.ascending` is false, the keys are sorted in descending
 * order.
 * @returns {Obj} A new object with the sorted keys.
 *
 * @example
 * ```typescript
 * const obj = { b: 1, a: 2, c: 3 }
 * sortKeys(obj)
 * // returns { a: 2, b: 1, c: 3 }
 * sortKeys(obj, { ascending: false })
 * // returns { c: 3, b: 1, a: 2 }
 * ```
 *
 * It assumes the keys are strings.
 */
export function sortKeys<Obj extends Record<string, unknown>>(
  obj: Obj,
  { ascending }: { ascending?: boolean } = { ascending: true },
): Obj {
  return Object.fromEntries(
    Object.entries(obj).sort(
      ([leftKey], [rightKey]) =>
        leftKey.localeCompare(rightKey) * (ascending ? 1 : -1),
    ),
  ) as Obj
}
