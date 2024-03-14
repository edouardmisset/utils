import { assert, assertEquals } from '@std/assert'
import { deepEqual } from './equals.ts'

Deno.test('deepEquals', async (t) => {
  await t.step('should return true for equal primitive values', () => {
    const result = deepEqual(1, 1)
    assert(result)
  })

  await t.step('should return false for unequal primitive values', () => {
    const result = deepEqual(1, 2)
    assert(!result)
  })

  await t.step('should return true for equal objects', () => {
    const result = deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })
    assert(result)
  })

  await t.step('should return false for unequal objects', () => {
    const result = deepEqual({ a: 1, b: 2 }, { a: 1, b: 3 })
    assert(!result)
  })

  await t.step('should return true for equal dates', () => {
    const result = deepEqual(new Date('2021-01-01'), new Date('2021-01-01'))
    assert(result)
  })

  await t.step('should return false for unequal dates', () => {
    const result = deepEqual(new Date('2021-01-01'), new Date('2022-01-01'))
    assert(!result)
  })

  await t.step('should return true for equal arrays', () => {
    const result = deepEqual([1, 2, 3], [1, 2, 3])
    assert(result)
  })

  await t.step('should return false for unequal arrays', () => {
    const result = deepEqual([1, 2, 3], [1, 2, 4])
    assert(!result)
  })

  await t.step(
    'should return false for objects with different prototypes',
    () => {
      // @ts-expect-error - Testing for invalid input
      const result = deepEqual({ a: 1 }, new Date())
      assertEquals(result, false)
    },
  )

  await t.step(
    'should return false for objects with the same prototype and different values',
    () => {
      const result = deepEqual({ a: 1 }, { b: 2 })
      assertEquals(result, false)
    },
  )

  await t.step('should return false for null and an object', () => {
    const result = deepEqual(null, { a: 1 })
    assertEquals(result, false)
  })

  await t.step('should return true for two null values', () => {
    const result = deepEqual(null, null)
    assertEquals(result, true)
  })

  await t.step(
    'should return false for objects with the same number of keys but different keys and values',
    () => {
      const result = deepEqual({ a: 1, b: 2 }, { c: 3, d: 4 })
      assertEquals(result, false)
    },
  )

  await t.step(
    'should return false for objects with different number of keys',
    () => {
      const result = deepEqual({ a: 1, b: 2, c: 3 }, { d: 4, e: 5 })
      assertEquals(result, false)
    },
  )

  await t.step('should return true for two empty objects', () => {
    const result = deepEqual({}, {})
    assertEquals(result, true)
  })

  await t.step(
    'should return false for an empty and a non-empty object',
    () => {
      const result = deepEqual({}, { a: 1 })
      assertEquals(result, false)
    },
  )
})
