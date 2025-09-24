import { assertEquals } from '@std/assert'
import { setDifference } from './set-difference.ts'

const array1 = [1, 2, 3] as const
const array2 = [2, 3, 4] as const
const emptyArray: number[] = [] as const
const singleElement1 = [1] as const
const singleElement2 = [2] as const
const identicalToArray1 = [1, 2, 3] as const
const noCommonElements1 = [1, 2] as const
const noCommonElements2 = [3, 4] as const
const stringArray1 = ['a', 'b'] as const
const stringArray2 = ['b', 'c'] as const

Deno.test('setDifference', async (t) => {
  await t.step('should return unique elements from 2 arrays', () => {
    const result = setDifference(array1, array2)
    assertEquals(result, [1, 4])
  })

  await t.step('should handle empty arrays', () => {
    assertEquals(setDifference(emptyArray, array1), [1, 2, 3])
    assertEquals(setDifference(array1, emptyArray), [1, 2, 3])
    assertEquals(setDifference(emptyArray, emptyArray), [])
  })

  await t.step('should handle identical arrays', () => {
    const result = setDifference(array1, identicalToArray1)
    assertEquals(result, [])
  })

  await t.step('should handle arrays with no common elements', () => {
    const result = setDifference(noCommonElements1, noCommonElements2)
    assertEquals(result, [1, 2, 3, 4])
  })

  await t.step('should handle arrays with duplicates', () => {
    const result = setDifference([1, 1, 2], [2, 3, 3])
    assertEquals(result, [1, 1, 3, 3])
  })

  await t.step('should handle single element arrays', () => {
    assertEquals(setDifference(singleElement1, singleElement2), [1, 2])
    assertEquals(setDifference(singleElement1, singleElement1), [])
  })

  await t.step('should handle different data types', () => {
    const result = setDifference(stringArray1, stringArray2)
    assertEquals(result, ['a', 'c'])
  })

  await t.step('should handle arrays of different sizes', () => {
    const result = setDifference(singleElement1, [2, 3, 4, 5])
    assertEquals(result, [1, 2, 3, 4, 5])
  })

  await t.step('should handle subset relationship', () => {
    const result = setDifference(noCommonElements1, [1, 2, 3, 4])
    assertEquals(result, [3, 4])
  })

  await t.step('should handle superset relationship', () => {
    const result = setDifference([1, 2, 3, 4], [2, 3])
    assertEquals(result, [1, 4])
  })
})