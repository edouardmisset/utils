import { assertEquals } from '@std/assert'
import { take } from './take.ts'
import { takeFixture } from './take.fixture.ts'

Deno.test('take', async (t) => {
  await t.step('should return the first n elements if n is positive', () => {
    const result = take(takeFixture, 2)
    assertEquals(result, [1, 2])
  })

  await t.step('should return the last n elements if n is negative', () => {
    const result = take(takeFixture, -2)
    assertEquals(result, [4, 5])
  })

  await t.step('should return the first element if n is not provided', () => {
    const result = take(takeFixture)
    assertEquals(result, [1])
  })
})
