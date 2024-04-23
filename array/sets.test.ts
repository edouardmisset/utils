import { assertEquals } from '@std/assert'
import {
  commonElements,
  mergeUnique,
  uniqueElements,
  uniqueInFirst,
} from './sets.ts'

Deno.test('commonElements', async (t) => {
  const array1 = [1, 2, 3]
  const array2 = [2, 3, 4]

  await t.step('should return common elements of two arrays', () => {
    const result = commonElements(array1, array2)
    assertEquals(result, [2, 3])
  })
})

Deno.test('mergeUnique', async (t) => {
  const array1 = [1, 2, 3]
  const array2 = [2, 3, 4]

  await t.step(
    'should return unique elements from the combination of two arrays',
    () => {
      const result = mergeUnique(array1, array2)
      assertEquals(result, [1, 2, 3, 4])
    },
  )
})

Deno.test('uniqueInFirst', async (t) => {
  const array1 = [1, 2, 3]
  const array2 = [2, 3, 4]
  const array3 = [3, 4, 5]

  await t.step(
    'should return elements that are unique to the first array',
    () => {
      const result = uniqueInFirst(array1, array2, array3)
      assertEquals(result, [1])
    },
  )
})

Deno.test('uniqueElements', async (t) => {
  const array1 = [1, 2, 3]
  const array2 = [2, 3, 4]
  const array3 = [3, 4, 5]

  await t.step('should return unique elements from n arrays', () => {
    const result = uniqueElements(array1, array2, array3)
    assertEquals(result, [1, 5])
  })
})
