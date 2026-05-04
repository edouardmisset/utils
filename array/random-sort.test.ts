import { assertEquals } from '@std/assert'
import { shuffleArray } from './random-sort.ts'
import { randomSortFixture } from './random-sort.fixture.ts'

Deno.test('shuffleArray function', async (t) => {
  const array = randomSortFixture

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
