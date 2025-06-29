import { assertEquals } from '@std/assert'
import {
  commonElements,
  mergeUnique,
  setDifference,
  uniqueElements,
  uniqueInFirst,
} from './sets.ts'

const array1 = [1, 2, 3] as const
const array2 = [2, 3, 4] as const
const array3 = [3, 4, 5] as const
const emptyArray: number[] = [] as const
const singleElement1 = [1] as const
const singleElement2 = [2] as const
const identicalToArray1 = [1, 2, 3] as const
const duplicatesArray1 = [1, 1, 2, 2] as const
const duplicatesArray2 = [2, 2, 3, 3] as const
const noCommonElements1 = [1, 2] as const
const noCommonElements2 = [3, 4] as const
const stringArray1 = ['a', 'b'] as const
const stringArray2 = ['b', 'c'] as const

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
      singleElement2,
      [3],
      [4],
      singleElement1,
    )
    assertEquals(result, [2, 3, 4])
  })
})

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
