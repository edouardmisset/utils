import { assert } from '@std/assert'
import { isPlainObject } from './is-plain-object.ts'

Deno.test('isPlainObject', async (t) => {
  await t.step('should return true for plain object', () => {
    const result = isPlainObject({})
    assert(result)
  })

  await t.step('should return false for array', () => {
    const result = isPlainObject([])
    assert(!result)
  })

  await t.step('should return false for null', () => {
    const result = isPlainObject(null)
    assert(!result)
  })
})