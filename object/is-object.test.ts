import { assert } from '@std/assert'
import { isObject } from './is-object.ts'

Deno.test('isObject', async (t) => {
  await t.step('should return true for object', () => {
    const result = isObject({})
    assert(result)
  })

  await t.step('should return true for array', () => {
    const result = isObject([])
    assert(result)
  })

  await t.step('should return false for string', () => {
    const result = isObject('Hello, world!')
    assert(!result)
  })
})

