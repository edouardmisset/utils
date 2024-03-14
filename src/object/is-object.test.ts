import { assert } from '@std/assert'
import { isNotNestedObject, isObject, isPlainObject } from './is-object.ts'

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
