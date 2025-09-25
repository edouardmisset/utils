import { assertEquals } from '@std/assert'
import { take } from './take.ts'

Deno.test('take', async (t) => {
  await t.step('should return the first n elements if n is positive', () => {
    const result = take([1, 2, 3, 4, 5], 2)
    assertEquals(result, [1, 2])
  })

  await t.step('should return the last n elements if n is negative', () => {
    const result = take([1, 2, 3, 4, 5], -2)
    assertEquals(result, [4, 5])
  })

  await t.step('should return the first element if n is not provided', () => {
    const result = take([1, 2, 3, 4, 5])
    assertEquals(result, [1])
  })
})
