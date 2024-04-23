import { assertEquals } from '@std/assert'
import { sum } from './sum.ts'

Deno.test('sum', async (t) => {
  await t.step('sums multiple number arguments', () => {
    const result = sum(1, 2, 3)
    assertEquals(result, 6)
  })

  await t.step('sums a single array of numbers', () => {
    const result = sum([1, 2, 3])
    assertEquals(result, 6)
  })

  await t.step('sums multiple arrays of numbers', () => {
    const result = sum([1, 2, 3], [4, 5, 6])
    assertEquals(result, 21)
  })

  await t.step('returns 0 for an empty array', () => {
    const result = sum([])
    assertEquals(result, 0)
  })
})
