import { assertEquals } from '@std/assert'
import { percent } from './percent.ts'

Deno.test('percent', async (t) => {
  await t.step('should scale a value from one range to another', () => {
    const result = percent({ maximum: 10, minimum: 0, value: 5 })
    assertEquals(result.error, undefined)
    assertEquals(result.data, 50)
  })

  await t.step('should handle a value at the lower bound of the range', () => {
    const result = percent({ maximum: 10, minimum: 0, value: 0 })
    assertEquals(result.error, undefined)
    assertEquals(result.data, 0)
  })

  await t.step('should handle a value at the upper bound of the range', () => {
    const result = percent({ maximum: 10, minimum: 0, value: 10 })
    assertEquals(result.error, undefined)
    assertEquals(result.data, 100)
  })

  await t.step('should handle a negative value', () => {
    const result = percent({ maximum: 10, minimum: -10, value: -5 })
    assertEquals(result.error, undefined)
    assertEquals(result.data, 25)
  })

  await t.step('should handle a negative range', () => {
    const result = percent({ maximum: 0, minimum: -10, value: -5 })
    assertEquals(result.error, undefined)
    assertEquals(result.data, 50)
  })

  await t.step('should handle a value outside the range', () => {
    const result = percent({ maximum: 10, minimum: 0, value: 15 })
    assertEquals(result.error, undefined)
    assertEquals(result.data, 150)
  })
})