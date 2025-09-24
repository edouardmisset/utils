import { assertEquals } from '@std/assert'
import { mergeUnique, union } from './merge-unique.ts'

const array1 = [1, 2, 3] as const
const array2 = [2, 3, 4] as const
const emptyArray: number[] = [] as const
const singleElement1 = [1] as const
const singleElement2 = [2] as const
const identicalToArray1 = [1, 2, 3] as const
const stringArray1 = ['a', 'b'] as const
const stringArray2 = ['b', 'c'] as const

Deno.test('mergeUnique', async (t) => {
  await t.step(
    'should return unique elements from the combination of two arrays',
    () => {
      const result = mergeUnique(array1, array2)
      assertEquals(result, [1, 2, 3, 4])
    },
  )

  await t.step('should handle empty arrays', () => {
    assertEquals(mergeUnique(emptyArray, array1), [1, 2, 3])
    assertEquals(mergeUnique(array1, emptyArray), [1, 2, 3])
    assertEquals(mergeUnique(emptyArray, emptyArray), [])
  })

  await t.step('should handle arrays with duplicates', () => {
    const result = mergeUnique([1, 1, 2], [2, 3, 3])
    assertEquals(result, [1, 2, 3])
  })

  await t.step('should handle identical arrays', () => {
    const result = mergeUnique(array1, identicalToArray1)
    assertEquals(result, [1, 2, 3])
  })

  await t.step('should handle single element arrays', () => {
    assertEquals(mergeUnique(singleElement1, singleElement2), [1, 2])
    assertEquals(mergeUnique(singleElement1, singleElement1), [1])
  })

  await t.step('should handle different data types', () => {
    const result = mergeUnique(stringArray1, stringArray2)
    assertEquals(result, ['a', 'b', 'c'])
  })
})

Deno.test('union (alias)', async (t) => {
  await t.step('should work as alias for mergeUnique', () => {
    const result = union(array1, array2)
    assertEquals(result, [1, 2, 3, 4])
  })
})