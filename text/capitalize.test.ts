import { assertEquals } from '@std/assert'
import { capitalize } from './capitalize.ts'

Deno.test('capitalize', async (t) => {
  await t.step(
    'should capitalize the first letter and make the rest lowercase',
    () => {
      assertEquals(capitalize('hello'), 'Hello')
      assertEquals(capitalize('WORLD'), 'World')
    },
  )

  await t.step('should handle single character strings', () => {
    assertEquals(capitalize('h'), 'H')
    assertEquals(capitalize('W'), 'W')
  })

  await t.step('should handle empty strings', () => {
    assertEquals(capitalize(''), '')
  })
})
