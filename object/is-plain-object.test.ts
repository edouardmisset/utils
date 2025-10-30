import { assert } from '@std/assert'
import { isPlainObject } from './is-plain-object.ts'

Deno.test('isPlainObject', async (t) => {
  await t.step('should return true for plain object', () => {
    const result = isPlainObject({})
    assert(result)
  })

  await t.step('should return true for object with properties', () => {
    const result = isPlainObject({ a: 1 })
    assert(result)
  })

  await t.step(
    'should return true for object created with new Object()',
    () => {
      const result = isPlainObject(new Object())
      assert(result)
    },
  )

  await t.step(
    'should return false for object created with Object.create(null)',
    () => {
      const result = isPlainObject(Object.create(null))
      assert(!result)
    },
  )

  await t.step('should return false for class instance', () => {
    class MyClass {}
    assert(!isPlainObject(new MyClass()))
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
