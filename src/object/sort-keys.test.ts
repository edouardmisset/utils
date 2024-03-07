import { assertEquals } from 'asserts'
import { sortKeys } from './sort-keys.ts'

Deno.test('sortKeys', async (t) => {
  await t.step('should sort keys in ascending order by default', () => {
    const result = sortKeys({ b: 1, a: 2, c: 3 })
    assertEquals(result, { a: 2, b: 1, c: 3 })
  })

  await t.step('should sort keys in ascending order ascending is true', () => {
    const result = sortKeys({ b: 1, a: 2, c: 3 }, { ascending: true })
    assertEquals(result, { a: 2, b: 1, c: 3 })
  })

  await t.step(
    'should sort keys in descending order ascending is false',
    () => {
      const result = sortKeys({ b: 1, a: 2, c: 3 }, { ascending: false })
      assertEquals(result, { c: 3, b: 1, a: 2 })
    },
  )

  await t.step('should handle an empty object', () => {
    const result = sortKeys({})
    assertEquals(result, {})
  })
})
