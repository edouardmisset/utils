import { assertEquals } from 'asserts'
import { objectKeys } from './object-keys.ts'

Deno.test('objectKeys', async (t) => {
  await t.step('should return keys for an object', () => {
    const result = objectKeys({ a: 1, b: 2, c: 3 })
    assertEquals(result, ['a', 'b', 'c'])
  })

  await t.step('should return keys for an object with different types', () => {
    const result = objectKeys({ a: 1, b: '2', c: true })
    assertEquals(result, ['a', 'b', 'c'])
  })

  await t.step('should return keys for an object with nested objects', () => {
    const result = objectKeys({ a: 1, b: { c: 2 } })
    assertEquals(result, ['a', 'b'])
  })
})
