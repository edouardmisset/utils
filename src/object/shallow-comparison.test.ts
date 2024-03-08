import { assertEquals } from 'asserts'
import { shallowEqual } from './shallow-comparison.ts'

Deno.test('shallowEqual', async (t) => {
  await t.step('should return true for two identical objects', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { a: 1, b: 2 }
    const result = shallowEqual(obj1, obj2)
    assertEquals(result, true)
  })

  await t.step(
    'should return true for two objects with the same keys and values but different order',
    () => {
      const obj1 = { a: 1, b: 2 }
      const obj2 = { b: 2, a: 1 }
      const result = shallowEqual(obj1, obj2)
      assertEquals(result, true)
    },
  )

  await t.step(
    'should return false for two objects with the same keys but different values',
    () => {
      const obj1 = { a: 1, b: 2 }
      const obj2 = { a: 1, b: 3 }
      const result = shallowEqual(obj1, obj2)
      assertEquals(result, false)
    },
  )

  await t.step(
    'should return false for two objects with different keys',
    () => {
      const obj1 = { a: 1, b: 2 }
      const obj2 = { a: 1, c: 2 }
      const result = shallowEqual(obj1, obj2 as unknown as typeof obj1)
      assertEquals(result, false)
    },
  )

  await t.step(
    'should return false for two objects with different number of keys',
    () => {
      const obj1 = { a: 1, b: 2 }
      const obj2 = { a: 1, b: 2, c: 3 }
      const result = shallowEqual(obj1, obj2)
      assertEquals(result, false)
    },
  )
})
