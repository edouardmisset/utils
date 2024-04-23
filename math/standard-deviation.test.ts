import { assertEquals } from '@std/assert'
import { standardDeviation } from './standard-deviation.ts'

Deno.test('standardDeviation', async (t) => {
  await t.step('calculates standard deviation for a sample', () => {
    const result = standardDeviation([1, 2, 3, 4])
    assertEquals(result, 1.2909944487358056)
  })

  await t.step('calculates standard deviation for a population', () => {
    const result = standardDeviation([1, 2, 3, 4], true)
    assertEquals(result, 1.118033988749895)
  })

  await t.step('returns 0 for a single-element array', () => {
    const result = standardDeviation([1])
    assertEquals(result, 0)
  })
})
