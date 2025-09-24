import { assertEquals } from '@std/assert'
import { uniqueElements, symmetricDifference } from './unique-elements.ts'

const array1 = [1, 2, 3] as const
const array2 = [2, 3, 4] as const
const array3 = [3, 4, 5] as const
const emptyArray: number[] = [] as const
const singleElement1 = [1] as const
const identicalToArray1 = [1, 2, 3] as const
const noCommonElements1 = [1, 2] as const
const noCommonElements2 = [3, 4] as const

Deno.test('uniqueElements', async (t) => {
  await t.step('should return unique elements from n arrays', () => {
    const result = uniqueElements(array1, array2, array3)
    assertEquals(result, [1, 5])
  })

  await t.step('should handle empty arrays', () => {
    assertEquals(uniqueElements(emptyArray, noCommonElements1, [3]), [1, 2, 3])
    assertEquals(uniqueElements(singleElement1, emptyArray, emptyArray), [1])
    assertEquals(uniqueElements(emptyArray, emptyArray, emptyArray), [])
  })

  await t.step('should handle single array', () => {
    const result = uniqueElements(array1)
    assertEquals(result, [1, 2, 3])
  })

  await t.step('should handle two arrays', () => {
    const result = uniqueElements(array1, array2)
    assertEquals(result, [1, 4])
  })

  await t.step('should handle arrays with duplicates within same array', () => {
    const result = uniqueElements([1, 1, 2], [2, 3, 3], [4])
    assertEquals(result, [4])
  })

  await t.step('should handle identical arrays', () => {
    const result = uniqueElements(array1, identicalToArray1)
    assertEquals(result, [])
  })

  await t.step('should handle no common elements', () => {
    const result = uniqueElements(noCommonElements1, noCommonElements2, [5, 6])
    assertEquals(result, [1, 2, 3, 4, 5, 6])
  })

  await t.step('should handle many arrays', () => {
    const result = uniqueElements(
      singleElement1,
      [2],
      [3],
      [4],
      singleElement1,
    )
    assertEquals(result, [2, 3, 4])
  })
})

Deno.test('symmetricDifference (alias)', async (t) => {
  await t.step('should work as alias for uniqueElements', () => {
    const result = symmetricDifference(array1, array2, array3)
    assertEquals(result, [1, 5])
  })
})