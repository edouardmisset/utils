import { assert } from 'asserts'
import { isFunction } from './is-function.ts'

Deno.test('isFunction', async (t) => {
  await t.step('should return true for function', () => {
    const result = isFunction(() => {})
    assert(result)
  })

  await t.step('should return false for non-function', () => {
    const result = isFunction('not a function')
    assert(!result)
  })

  await t.step('should return false for null', () => {
    const result = isFunction(null)
    assert(!result)
  })

  await t.step('should return false for undefined', () => {
    const result = isFunction(undefined)
    assert(!result)
  })

  await t.step('should return false for {}', () => {
    const result = isFunction({})
    assert(!result)
  })
})
