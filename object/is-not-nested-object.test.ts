import { assert } from '@std/assert'
import { isNotNestedObject } from './is-not-nested-object.ts'

Deno.test('isNotNestedObject', async (t) => {
  await t.step('should return true for non-nested object', () => {
    const result = isNotNestedObject({ a: 1, b: '2', c: null })
    assert(result)
  })

  await t.step('should return false for nested object', () => {
    const result = isNotNestedObject({ a: 1, b: { c: 2 } })
    assert(!result)
  })
})