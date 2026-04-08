import type { SetDifference } from '@edouardmisset/type'

/**
 * Computes the difference between two arrays, returning the unique items from
 * both arrays.
 *
 * @deprecated Deprecated and scheduled for removal in v6, native Set operations should be preferred.
 *
 * Migration (native):
 * ```typescript
 * const result = [...new Set(firstArray).symmetricDifference(new Set(secondArray))]
 * ```
 *
 * API availability:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/symmetricDifference#browser_compatibility
 *
 * @template FirstArrayType - The type of the first array.
 * @template SecondArrayType - The type of the second array.
 * @template Result - The type of the result array.
 * @param {FirstArrayType} firstArray - The first array.
 * @param {SecondArrayType} secondArray - The second array.
 * @returns {Result[]} - An array containing the unique items from both arrays.
 *
 * @example
 * ```typescript
 * import { assertEquals } from "@std/assert";
 *
 * const array1 = [1, 2, 3, 4];
 * const array2 = [3, 4, 5, 6];
 * const result = setDifference(array1, array2);
 * assertEquals(result, [1, 2, 5, 6]);
 * ```
 */
export function setDifference<
  const FirstArrayType extends readonly unknown[],
  const SecondArrayType extends readonly unknown[],
  Result extends SetDifference<FirstArrayType, SecondArrayType>,
>(firstArray: FirstArrayType, secondArray: SecondArrayType): Result[] {
  const secondSet = new Set(secondArray)
  const firstSet = new Set(firstArray)
  const uniqueItemsFromFirstArray = firstArray.filter(
    (item) => !secondSet.has(item),
  )
  const uniqueItemsFromSecondArray = secondArray.filter(
    (item) => !firstSet.has(item),
  )
  return [
    ...uniqueItemsFromFirstArray,
    ...uniqueItemsFromSecondArray,
  ] as Result[]
}
