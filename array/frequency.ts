/**
 * Calculates the frequency of each unique element in an array.
 * @template T - The type of elements in the array, which extends string or number.
 * @param {T[]} array - An array of elements of type T.
 * @returns {Record<T, number>} - An object where the keys are the unique elements from the input array and the values are their corresponding frequencies.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // String array frequency
 * assertEquals(
 *   frequency(['apple', 'banana', 'apple', 'cherry']),
 *   { 'apple': 2, 'banana': 1, 'cherry': 1 }
 * )
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Number array frequency
 * assertEquals(
 *   frequency([1, 2, 1, 3]),
 *   { '1': 2, '2': 1, '3': 1 }
 * )
 * ```
 */
export function frequency<T extends string | number>(
  array: T[],
): Record<T, number> {
  return array.reduce((frequencyObject, value) => {
    frequencyObject[value] = (frequencyObject[value] ?? 0) + 1
    return frequencyObject
  }, {} as Record<T, number>)
}
