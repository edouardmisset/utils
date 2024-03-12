import { assertEquals } from '@std/assert'
import { shuffleArray } from './random-sort.ts'

Deno.test({
  name: 'should return an array with the same length',
  fn: () => {
    const array = [1, 2, 3, 4, 5]
    const result = shuffleArray(array)
    assertEquals(result.length, array.length)
  },
})

Deno.test({
  name: 'should return an array with the same elements',
  fn: () => {
    const array = [1, 2, 3, 4, 5]
    const result = shuffleArray(array)
    assertEquals(result.sort(), array.sort())
  },
})

Deno.test({
  name: 'should not mutate the original array',
  fn: () => {
    const array = [1, 2, 3, 4, 5]
    const copy = [...array]
    shuffleArray(array)
    assertEquals(array, copy)
  },
})
