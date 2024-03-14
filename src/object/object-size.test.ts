import { assertEquals } from '@std/assert'
import { objectSize } from './object-size.ts'

Deno.test('objectSize', async (t) => {
  await t.step('should return size for an object', () => {
    const result = objectSize({ a: 1, b: 2, c: 3 })
    assertEquals(result, 3)
  })

  await t.step('should return 0 for an empty object', () => {
    const result = objectSize({})
    assertEquals(result, 0)
  })

  await t.step('should return size for an object with nested objects', () => {
    const result = objectSize({ a: 1, b: { c: 2 } })
    assertEquals(result, 2)
  })
})
