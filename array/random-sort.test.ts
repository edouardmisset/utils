import { assertEquals } from '@std/assert'
import { shuffleArray } from './random-sort.ts'

Deno.test('shuffleArray function', async (t) => {
  const array = [1, 2, 3, 4, 5]

  await t.step('should return an array with the same length', () => {
    const result = shuffleArray(array)
    assertEquals(result.length, array.length)
  })

  await t.step('should return an array with the same elements', () => {
    const result = shuffleArray(array)
    assertEquals(result.sort(), [...array].sort())
  })

  await t.step('should not mutate the original array', () => {
    const copy = [...array]
    shuffleArray(array)
    assertEquals(array, copy)
  })
})
