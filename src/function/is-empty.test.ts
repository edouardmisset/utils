import { assert } from 'asserts'
import { isEmpty } from './is-empty.ts'

Deno.test('isEmpty', async (t) => {
  await t.step('should return true for null', () => {
    const result = isEmpty(null)
    assert(result)
  })

  await t.step('should return true for undefined', () => {
    const result = isEmpty(undefined)
    assert(result)
  })

  await t.step('should return true for empty string', () => {
    const result = isEmpty('')
    assert(result)
  })

  await t.step('should return true for string with only whitespace', () => {
    const result = isEmpty('   ')
    assert(result)
  })

  await t.step('should return true for empty object', () => {
    const result = isEmpty({})
    assert(result)
  })

  await t.step('should return true for empty array', () => {
    const result = isEmpty([])
    assert(result)
  })

  await t.step('should return false for non-empty string', () => {
    const result = isEmpty('Hello, world!')
    assert(!result)
  })

  await t.step('should return false for non-empty object', () => {
    const result = isEmpty({ a: 1 })
    assert(!result)
  })

  await t.step('should return false for non-empty array', () => {
    const result = isEmpty([1, 2, 3])
    assert(!result)
  })
})
