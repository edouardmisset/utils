/**
 * Counts the number of elements in an array that satisfy a condition.
 *
 * @template T The type of elements in the array.
 * @param {T[]} arr - The array to process.
 * @param {(arg: T) => boolean} checkFunction - The function to test each element of the array.
 * This function should accept a single argument of type T (the type of elements in the array)
 * and return a boolean.
 *
 * @returns {number} The number of elements that satisfy the condition.
 *
 * @example
 * ```typescript
 * const arr = [1, 2, 3, 4, 5]
 * function isEven(num: number) {
 *   return num % 2 === 0
 * }
 * countBy(arr, isEven)
 * // returns 2
 * ```
 *
 * @example
 * ```typescript
 * const arr = ['apple', 'banana', 'cherry', 'apple', 'cherry', 'cherry']
 * function isCherry(fruit: string) {
 *   return fruit === 'cherry'
 * }
 * countBy(arr, isCherry)
 * // returns 3
 * ```
 */
export function countBy<T>(
  arr: T[],
  checkFunction: (arg: T) => boolean,
): number {
  return arr.reduce(
    (count, value) => checkFunction(value) ? count + 1 : count,
    0,
  )
}

/**
 * Alias for the {@link countBy} function.
 */
export const countIf: typeof countBy = countBy

/**
 * Calculates the frequency of each unique element in an array.
 * @template T - The type of elements in the array, which extends string or number.
 * @param {T[]} arr - An array of elements of type T.
 * @returns {Record<T, number>} - An object where the keys are the unique elements from the input array and the values are their corresponding frequencies.
 *
 * @example
 * ```typescript
 * frequency(['apple', 'banana', 'apple', 'cherry'])
 * // returns { 'apple': 2, 'banana': 1, 'cherry': 1 }
 * ```
 *
 * @example
 * ```typescript
 * frequency([1, 2, 1, 3])
 * // returns { '1': 2, '2': 1, '3': 1 }
 * ```
 */
export function frequency<T extends string | number>(
  arr: T[],
): Record<T, number> {
  return arr.reduce((acc, val) => {
    acc[val] = (acc[val] ?? 0) + 1
    return acc
  }, {} as Record<T, number>)
}
