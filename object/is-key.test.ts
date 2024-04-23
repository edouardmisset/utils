import { assertEquals } from '@std/assert'
import { isKey } from './is-key.ts'

Deno.test('isKey function', async (t) => {
  await t.step('key exists', () => {
    const obj = { a: 1, b: 'hello', c: true }
    const result = isKey(obj, 'b')
    assertEquals(result, true)
  })

  await t.step('key does not exist', () => {
    const obj = { a: 1, b: 'hello', c: true }
    const result = isKey(obj, 'd')
    assertEquals(result, false)
  })

  await t.step('empty object', () => {
    const obj = {}
    const result = isKey(obj, 'a')
    assertEquals(result, false)
  })
})
