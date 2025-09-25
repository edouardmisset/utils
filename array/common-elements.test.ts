import { assertEquals } from '@std/assert'
import { commonElements, intersection } from './common-elements.ts'

const array1 = [1, 2, 3] as const
const array2 = [2, 3, 4] as const
const emptyArray: number[] = [] as const
const singleElement1 = [1] as const
const singleElement2 = [2] as const
const identicalToArray1 = [1, 2, 3] as const
const duplicatesArray1 = [1, 1, 2, 2] as const
const duplicatesArray2 = [2, 2, 3, 3] as const
const noCommonElements1 = [1, 2] as const
const noCommonElements2 = [3, 4] as const

Deno.test('commonElements', async (t) => {
  await t.step('should return common elements of two arrays', () => {
    const result = commonElements(array1, array2)
    assertEquals(result, [2, 3])
  })

  await t.step('should return empty array when no common elements', () => {
    const result = commonElements(noCommonElements1, noCommonElements2)
    assertEquals(result, [])
  })

  await t.step('should handle empty arrays', () => {
    assertEquals(commonElements(emptyArray, array1), [])
    assertEquals(commonElements(array1, emptyArray), [])
    assertEquals(commonElements(emptyArray, emptyArray), [])
  })

  await t.step('should handle arrays with duplicates', () => {
    const result = commonElements(duplicatesArray1, duplicatesArray2)
    assertEquals(result, [2, 2])
  })

  await t.step('should handle identical arrays', () => {
    const result = commonElements(array1, identicalToArray1)
    assertEquals(result, [1, 2, 3])
  })

  await t.step('should handle single element arrays', () => {
    assertEquals(commonElements(singleElement1, singleElement1), [1])
    assertEquals(commonElements(singleElement1, singleElement2), [])
  })
})

Deno.test('intersection (alias)', async (t) => {
  await t.step('should work as alias for commonElements', () => {
    const result = intersection(array1, array2)
    assertEquals(result, [2, 3])
  })
})
