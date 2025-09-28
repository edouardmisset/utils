/**
 * Calculates the frequency of each unique element in an array.
 * @template T - The type of elements in the array, which extends string or number.
 * @param {T[]} array - An array of elements of type T.
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
  array: T[],
): Record<T, number> {
  return array.reduce((frequencyCounter, value) => {
    frequencyCounter[value] = (frequencyCounter[value] ?? 0) + 1
    return frequencyCounter
  }, {} as Record<T, number>)
}
