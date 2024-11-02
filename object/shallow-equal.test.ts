import { assertEquals } from '@std/assert'
import { shallowEqual } from './shallow-equal.ts'

Deno.test('shallowEqual', async (t) => {
  await t.step('should return true for two identical objects', () => {
    const object1 = { a: 1, b: 2 }
    const object2 = { a: 1, b: 2 }
    const result = shallowEqual(object1, object2)
    assertEquals(result, true)
  })

  await t.step(
    'should return true for two objects with the same keys and values but different order',
    () => {
      const object1 = { a: 1, b: 2 }
      const object2 = { b: 2, a: 1 }
      const result = shallowEqual(object1, object2)
      assertEquals(result, true)
    },
  )

  await t.step(
    'should return false for two objects with the same keys but different values',
    () => {
      const object1 = { a: 1, b: 2 }
      const object2 = { a: 1, b: 3 }
      const result = shallowEqual(object1, object2)
      assertEquals(result, false)
    },
  )

  await t.step(
    'should return false for two objects with different keys',
    () => {
      const object1 = { a: 1, b: 2 }
      const object2 = { a: 1, c: 2 }
      const result = shallowEqual(object1, object2 as unknown as typeof object1)
      assertEquals(result, false)
    },
  )

  await t.step(
    'should return false for two objects with different number of keys',
    () => {
      const object1 = { a: 1, b: 2 }
      const object2 = { a: 1, b: 2, c: 3 }
      const result = shallowEqual(object1, object2)
      assertEquals(result, false)
    },
  )
})
