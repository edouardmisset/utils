import { assert } from 'asserts'
import { isValidJSON } from './is-valid-json.ts'

Deno.test("isValidJSON", async t => {
  await t.step('should return true for valid JSON', () => {
    const result = isValidJSON('{"name":"John", "age":30, "city":"New York"}')
    assert(result)
  })

  await t.step('should return false for invalid JSON', () => {
    const result = isValidJSON('Invalid JSON string')
    assert(!result)
  })

  await t.step('should return true for empty an string', () => {
    const result = isValidJSON('')
    assert(!result)
  })
})