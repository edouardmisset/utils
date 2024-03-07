/**
 * Sorts the values of an object and returns a new object with the sorted values.
 *
 * @template Obj - The type of the object.
 * @param {Obj} obj - The object whose values are to be sorted.
 * @param {{ ascending?: boolean }} [options={ ascending: true }] - An options
 * object. If `options.ascending` is false, the values are sorted in descending
 * order.
 * @returns {Obj} A new object with the sorted values.
 *
 * @example
 * ```typescript
 * const objStr = { a: 'z', b: 'y', c: 'x' }
 * const sortedObjStrAsc = sortValues(objStr)
 * // returns { c: 'x', b: 'y', a: 'z' }
 * const sortedObjStrDesc = sortValues(objStr, { ascending: false })
 * // returns { a: 'z', b: 'y', c: 'x' }
 *
 * const objNum = { a: 3, b: 2, c: 1 }
 * const sortedObjNumAsc = sortValues(objNum)
 * // returns { c: 1, b: 2, a: 3 }
 * const sortedObjNumDesc = sortValues(objNum, { ascending: false })
 * // returns { a: 3, b: 2, c: 1 }
 * ```
 *
 * It assumes the values are strings or numbers.
 */
export function sortValues<Obj extends Record<string, number | string>>(
  obj: Obj,
  { ascending }: { ascending?: boolean } = { ascending: true },
): Obj {
  return Object.fromEntries(
    Object.entries(obj).sort(
      ([, leftValue], [, rightValue]) => {
        if (typeof leftValue !== typeof rightValue) return 0
        const order = ascending ? 1 : -1

        if (typeof leftValue === 'string' && typeof rightValue === 'string') {
          return leftValue.localeCompare(rightValue) * order
        }

        if (typeof leftValue === 'number' && typeof rightValue === 'number') {
          return (leftValue === rightValue)
            ? 0
            : ((leftValue < rightValue ? 1 : -1) * order)
        }

        return 0
      },
    ),
  ) as Obj
}
