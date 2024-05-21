/**
 * Creates a string sorter function.
 *
 * @template Object_ - A type that extends Record<string, unknown>.
 * @param {keyof Object_} [key] - The key to sort by.
 * @param {boolean} [ascending=true] - Whether to sort in ascending order. If
 * false, sorts in descending order.
 * @returns {function} - A function that takes two strings or objects and
 * returns a number indicating their sort order.
 *
 * @example
 * ```typescript
 * const sorter = createStringSorter<{ name: string, age: number }>('name')
 * const array = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]
 * array.sort(sorter)
 * // returns [{ name: 'Jane', age: 25 }, { name: 'John', age: 30 }]
 * ```
 */
export function createStringSorter<Object_ extends Record<string, unknown>>(
  key?: keyof Object_,
  ascending = true,
): (left: Object_ | string, right: Object_ | string) => number {
  return (left, right) => {
    const leftStr = typeof left === 'string'
      ? left
      : (left[key as keyof Object_] as string)
    const rightStr = typeof right === 'string'
      ? right
      : (right[key as keyof Object_] as string)

    return leftStr.localeCompare(rightStr) * (ascending ? 1 : -1)
  }
}

/**
 * Alias for the {@link createStringSorter} function.
 */
export const buildStringSorter: typeof createStringSorter = createStringSorter

/**
 * Creates a number sorter function.
 *
 * @template Object_ - A type that extends Record<string, unknown>.
 * @param {keyof Object_} [key] - The key to sort by.
 * @param {boolean} [ascending=true] - Whether to sort in ascending order. If
 * false, sorts in descending order.
 * @returns {function} - A function that takes two numbers or objects and
 * returns a number indicating their sort order.
 *
 * @example
 * ```typescript
 * const sorter = createNumberSorter<{ id: number, value: number }>('value')
 * const array = [{ id: 1, value: 10 }, { id: 2, value: 5 }, { id: 3, value: 20 }]
 * array.sort(sorter)
 * // returns [{ id: 2, value: 5 }, { id: 1, value: 10 }, { id: 3, value: 20 }]
 * ```
 */
export function createNumberSorter<Object_ extends Record<string, unknown>>(
  key?: keyof Object_,
  ascending = true,
): (left: Object_ | number, right: Object_ | number) => number {
  return (left, right) => {
    const leftNum = typeof left === 'number'
      ? left
      : (left[key as keyof Object_] as number)
    const rightNum = typeof right === 'number'
      ? right
      : (right[key as keyof Object_] as number)

    if (Number.isNaN(leftNum)) return 1
    if (Number.isNaN(rightNum)) return -1

    return (leftNum - rightNum) * (ascending ? 1 : -1)
  }
}

/**
 * Alias for the {@link createNumberSorter} function.
 */
export const buildNumberSorter: typeof createNumberSorter = createNumberSorter

/**
 * Creates a date sorter function.
 *
 * @template Object_ - A type that extends Record<string, unknown>.
 * @param {keyof Object_} [key] - The key to sort by.
 * @param {boolean} [ascending=true] - Whether to sort in ascending order. If
 * false, sorts in descending order.
 * @returns {function} - A function that takes two dates or objects and returns
 * a number indicating their sort order.
 *
 * @example
 * ```typescript
 * const sorter = createDateSorter<{ id: number, date: Date }>('date')
 * const array = [{ id: 1, date: new Date(2022, 0, 1) }, { id: 2, date: new Date(2022, 0, 2) }, { id: 3, date: new Date(2022, 0, 3) }]
 * array.sort(sorter)
 * // returns [{ id: 1, date: new Date(2022, 0, 1) }, { id: 2, date: new Date(2022, 0, 2) }, { id: 3, date: new Date(2022, 0, 3) }]
 * ```
 */
export function createDateSorter<Object_ extends Record<string, unknown>>(
  key?: keyof Object_,
  ascending = true,
): (left: Object_ | Date, right: Object_ | Date) => number {
  return (left, right) => {
    const leftDate = left instanceof Date
      ? left
      : (left[key as keyof Object_] as Date)
    const rightDate = right instanceof Date
      ? right
      : (right[key as keyof Object_] as Date)

    if (Number.isNaN(leftDate.getTime())) return 1
    if (Number.isNaN(rightDate.getTime())) return -1
    return (leftDate.getTime() - rightDate.getTime()) * (ascending ? 1 : -1)
  }
}

/**
 * Alias for the {@link createDateSorter} function.
 */
export const buildDateSorter: typeof createDateSorter = createDateSorter
