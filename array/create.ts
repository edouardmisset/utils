// no imports

/**
 * Creates an array of a specified length and populates it with the results of calling a provided function on every index in the array.
 *
 * @template T - The type of elements in the resulting array.
 * @param {number} length - The length of the array to create.
 * @param {function(_: unknown, index: number): T} [transform] - The function to call on every index in the array. By default, it returns the index itself.
 * @returns {T[]} An array of length `length` with its elements being the result of the `transform` function.
 *
 * @example
 * ```typescript
 * import { createArray } from './create.ts'
 *
 * createArray(5, (_, index) => index * 2)
 * // returns [0, 2, 4, 6, 8]
 * ```
 *
 * @example
 * ```typescript
 * import { createArray } from './create.ts'
 *
 * createArray(5, (_, index) => `Item ${index}`)
 * // returns ['Item 0', 'Item 1', 'Item 2', 'Item 3', 'Item 4']
 * ```
 *
 * @example
 * ```typescript
 * import { createArray } from './create.ts'
 *
 * // Create an array of numbers using the default transform function
 * createArray(5)
 * // returns [0, 1, 2, 3, 4]
 * ```
 */
export function createArray<T = number>(
  length: number,
  // @ts-expect-error: I don't know how to fix this type error
  callback: Parameters<typeof Array.from<T, U>>[1] = (_, index): number =>
    index,
): T[] {
  return Array.from({ length }, callback) as T[]
}

// Note: range and its alias `sequence` moved to `range.ts`.
