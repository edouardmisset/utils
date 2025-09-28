/**
 * Counts the number of elements in an array that satisfy a condition.
 *
 * @template T The type of elements in the array.
 * @param {T[]} array - The array to process.
 * @param {(argument: T) => boolean} checkFunction - The function to test each element of the array.
 * This function should accept a single argument of type T (the type of elements in the array)
 * and return a boolean.
 *
 * @returns {number} The number of elements that satisfy the condition.
 *
 * @example
 * ```typescript
 * const array = [1, 2, 3, 4, 5]
 * function isEven(number_: number) {
 *   return number_ % 2 === 0
 * }
 * countBy(array, isEven)
 * // returns 2
 * ```
 *
 * @example
 * ```typescript
 * const array = ['apple', 'banana', 'cherry', 'apple', 'cherry', 'cherry']
 * function isCherry(fruit: string) {
 *   return fruit === 'cherry'
 * }
 * countBy(array, isCherry)
 * // returns 3
 * ```
 */
export function countBy<T>(
  array: T[],
  checkFunction: (argument: T) => boolean,
): number {
  return array.reduce(
    (count, value) => checkFunction(value) ? count + 1 : count,
    0,
  )
}

/**
 * Alias for the {@link countBy} function.
 */
export const countIf: typeof countBy = countBy
