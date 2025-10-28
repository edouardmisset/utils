import type { ObjectOfType } from '@edouardmisset/type'

/**
 * Creates a string sorter function.
 *
 * @template Object_ - A type that extends ObjectOfType<unknown>.
 * @param {object} [options] - The sorting options that extends Intl.CollatorOptions.
 * @param {boolean} [options.descending=false] - Whether to sort in descending order.
 * @param {keyof Object_} [options.key] - The key to sort by when sorting objects.
 * @param {string | undefined} [options.locales] - The locales to use for string comparison.
 * @returns {function} - A function that takes two strings or objects and
 * returns a number indicating their sort order.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const sorter = createStringSorter<{ name: string, age: number }>({ key: 'name' })
 * const array = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]
 * assertEquals(array.sort(sorter), [{ name: 'Jane', age: 25 }, { name: 'John', age: 30 }])
 *
 * // For descending order
 * const descendingSorter = createStringSorter({ key: 'name', descending: true })
 * assertEquals(array.sort(descendingSorter), [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }])
 * ```
 */
export function createStringSorter<Object_ extends ObjectOfType<unknown>>(
  options?: {
    descending?: boolean
    key?: keyof Object_
    locales?: string | undefined
  } & Intl.CollatorOptions,
): (left: Object_ | string, right: Object_ | string) => number {
  const {
    descending = false,
    key,
    locales = undefined,
    numeric = true,
    sensitivity = 'base',
    ...collatorOptions
  } = options ?? {}

  const collator = new Intl.Collator(locales, {
    numeric,
    sensitivity,
    ...collatorOptions,
  })

  return (left, right) => {
    const leftString = typeof left === 'string'
      ? left
      : (left[key as keyof Object_] as string)

    const rightString = typeof right === 'string'
      ? right
      : (right[key as keyof Object_] as string)

    return collator.compare(leftString, rightString) * (descending ? -1 : 1)
  }
}

/**
 * Alias for the {@link createStringSorter} function.
 */
export const buildStringSorter: typeof createStringSorter = createStringSorter

/**
 * Creates a number sorter function.
 *
 * @template Object_ - A type that extends ObjectOfType<unknown>.
 * @param {object} [options] - The sorting options.
 * @param {keyof Object_} [options.key] - The key to sort by when sorting objects.
 * @param {boolean} [options.descending=false] - Whether to sort in descending order.
 * @returns {function} - A function that takes two numbers or objects and
 * returns a number indicating their sort order.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const sorter = createNumberSorter<{ id: number, value: number }>({ key: 'value' })
 * const array = [{ id: 1, value: 10 }, { id: 2, value: 5 }, { id: 3, value: 20 }]
 * assertEquals(array.sort(sorter), [{ id: 2, value: 5 }, { id: 1, value: 10 }, { id: 3, value: 20 }])
 *
 * // For descending order
 * const descendingSorter = createNumberSorter({ key: 'value', descending: true })
 * assertEquals(array.sort(descendingSorter), [{ id: 3, value: 20 }, { id: 1, value: 10 }, { id: 2, value: 5 }])
 * ```
 */
export function createNumberSorter<Object_ extends ObjectOfType<unknown>>(
  options?: {
    key?: keyof Object_
    descending?: boolean
  },
): (left: Object_ | number, right: Object_ | number) => number {
  const { key, descending = false } = options ?? {}
  return (left, right) => {
    const leftNumber = typeof left === 'number'
      ? left
      : (left[key as keyof Object_] as number)
    const rightNumber = typeof right === 'number'
      ? right
      : (right[key as keyof Object_] as number)

    if (Number.isNaN(leftNumber)) return 1
    if (Number.isNaN(rightNumber)) return -1

    return (leftNumber - rightNumber) * (descending ? -1 : 1)
  }
}

/**
 * Alias for the {@link createNumberSorter} function.
 */
export const buildNumberSorter: typeof createNumberSorter = createNumberSorter

/**
 * Creates a date sorter function.
 *
 * @template Object_ - A type that extends ObjectOfType<unknown>.
 * @param {object} [options] - The sorting options.
 * @param {keyof Object_} [options.key] - The key to sort by when sorting objects.
 * @param {boolean} [options.descending=false] - Whether to sort in descending order.
 * @returns {function} - A function that takes two dates or objects and returns
 * a number indicating their sort order.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const sorter = createDateSorter<{ id: number, date: Date }>({ key: 'date' })
 * const array = [{ id: 1, date: new Date(2022, 0, 3) }, { id: 2, date: new Date(2022, 0, 1) }, { id: 3, date: new Date(2022, 0, 2) }]
 * assertEquals(array.sort(sorter), [{ id: 2, date: new Date(2022, 0, 1) }, { id: 3, date: new Date(2022, 0, 2) }, { id: 1, date: new Date(2022, 0, 3) }])
 *
 * // For descending order
 * const descendingSorter = createDateSorter({ key: 'date', descending: true })
 * assertEquals(array.sort(descendingSorter), [{ id: 1, date: new Date(2022, 0, 3) }, { id: 3, date: new Date(2022, 0, 2) }, { id: 2, date: new Date(2022, 0, 1) }])
 * ```
 */
export function createDateSorter<Object_ extends ObjectOfType<unknown>>(
  options?: {
    key?: keyof Object_
    descending?: boolean
  },
): (left: Object_ | Date, right: Object_ | Date) => number {
  const { key, descending = false } = options ?? {}
  return (left, right) => {
    const leftDate = left instanceof Date
      ? left
      : (left[key as keyof Object_] as Date)
    const rightDate = right instanceof Date
      ? right
      : (right[key as keyof Object_] as Date)

    if (Number.isNaN(leftDate.getTime())) return 1
    if (Number.isNaN(rightDate.getTime())) return -1
    return (leftDate.getTime() - rightDate.getTime()) * (descending ? -1 : 1)
  }
}

/**
 * Alias for the {@link createDateSorter} function.
 */
export const buildDateSorter: typeof createDateSorter = createDateSorter
