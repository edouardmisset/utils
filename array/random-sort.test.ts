import { assertEquals } from '@std/assert'
import { shuffleArray } from './random-sort.ts'

const array = [1, 2, 3, 4, 5]

Deno.test(
  'should return an array with the same length',
  () => {
    const result = shuffleArray(array)
    assertEquals(result.length, array.length)
  },
)

Deno.test(
  'should return an array with the same elements',
  () => {
    const result = shuffleArray(array)
    assertEquals(result.sort(), [...array].sort())
  },
)

Deno.test(
  'should not mutate the original array',
  () => {
    const copy = [...array]
    shuffleArray(array)
    assertEquals(array, copy)
  },
)
