import { assertEquals } from '@std/assert'
import { uniqueInFirst } from './unique-in-first.ts'

const array1 = [1, 2, 3] as const
const array2 = [2, 3, 4] as const
const array3 = [3, 4, 5] as const
const emptyArray: number[] = [] as const
const singleElement1 = [1] as const
const singleElement2 = [2] as const
const noCommonElements1 = [1, 2] as const
const noCommonElements2 = [3, 4] as const

Deno.test('uniqueInFirst', async (t) => {
  await t.step(
    'should return elements that are unique to the first array',
    () => {
      const result = uniqueInFirst(array1, array3, array2)
      assertEquals(result, [1])
    },
  )

  await t.step('should handle empty first array', () => {
    const result = uniqueInFirst(
      emptyArray,
      noCommonElements1,
      noCommonElements2,
    )
    assertEquals(result, [])
  })

  await t.step('should handle empty other arrays', () => {
    const result = uniqueInFirst(array1, emptyArray, emptyArray)
    assertEquals(result, [1, 2, 3])
  })

  await t.step('should handle all empty arrays', () => {
    const result = uniqueInFirst(emptyArray, emptyArray, emptyArray)
    assertEquals(result, [])
  })

  await t.step('should handle no other arrays', () => {
    const result = uniqueInFirst(array1)
    assertEquals(result, [1, 2, 3])
  })

  await t.step('should handle duplicates in first array', () => {
    const result = uniqueInFirst([1, 1, 2, 3], [2], [3])
    assertEquals(result, [1, 1])
  })

  await t.step(
    'should return empty when all elements are in other arrays',
    () => {
      const result = uniqueInFirst(
        noCommonElements1,
        singleElement1,
        singleElement2,
      )
      assertEquals(result, [])
    },
  )
})
