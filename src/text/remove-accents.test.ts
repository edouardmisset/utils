import { removeAccents } from './remove-accents.ts'
import { assertEquals } from 'asserts'

Deno.test('removeAccents', async (t) => {
  await t.step('should remove accents from string', () => {
    assertEquals(removeAccents('Héllo Wórld'), 'Hello World')
  })

  await t.step('should return the same string if there are no accents', () => {
    assertEquals(removeAccents('Hello World'), 'Hello World')
  })

  await t.step('should handle empty strings', () => {
    assertEquals(removeAccents(''), '')
  })
})
