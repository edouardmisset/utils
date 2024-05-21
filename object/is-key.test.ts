import { assertEquals } from '@std/assert'
import { isKey } from './is-key.ts'

Deno.test('isKey function', async (t) => {
  await t.step('key exists', () => {
    const object = { a: 1, b: 'hello', c: true }
    const result = isKey(object, 'b')
    assertEquals(result, true)
  })

  await t.step('key does not exist', () => {
    const object = { a: 1, b: 'hello', c: true }
    const result = isKey(object, 'd')
    assertEquals(result, false)
  })

  await t.step('empty object', () => {
    const object = {}
    const result = isKey(object, 'a')
    assertEquals(result, false)
  })
})
