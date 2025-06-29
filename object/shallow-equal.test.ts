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

  // Edge cases
  await t.step('should return true for two empty objects', () => {
    const object1 = {}
    const object2 = {}
    const result = shallowEqual(object1, object2)
    assertEquals(result, true)
  })

  await t.step(
    'should return false when comparing empty with non-empty object',
    () => {
      const object1 = {}
      const object2 = { a: 1 }
      const result = shallowEqual(object1, object2)
      assertEquals(result, false)
    },
  )

  // Falsy values
  await t.step('should handle falsy values correctly', () => {
    const object1 = { a: 0, b: false, c: '', d: null, e: undefined }
    const object2 = { a: 0, b: false, c: '', d: null, e: undefined }
    const result = shallowEqual(object1, object2)
    assertEquals(result, true)
  })

  await t.step('should return true for NaN values', () => {
    const object1 = { a: NaN }
    const object2 = { a: NaN }
    const result = shallowEqual(object1, object2)
    assertEquals(result, true)
  })

  // Reference equality
  await t.step('should return true for same object reference', () => {
    const object1 = { a: 1, b: 2 }
    const result = shallowEqual(object1, object1)
    assertEquals(result, true)
  })

  // Shallow comparison behavior
  await t.step('should perform shallow comparison on nested objects', () => {
    const nestedObj = { x: 1 }
    const object1 = { a: nestedObj, b: 2 }
    const object2 = { a: nestedObj, b: 2 } // Same reference
    const result1 = shallowEqual(object1, object2)
    assertEquals(result1, true)

    // Different objects with same content
    const object3 = { a: { x: 1 }, b: 2 } // Different reference, same content
    const object4 = { a: { x: 1 }, b: 2 }
    const result2 = shallowEqual(object3, object4)
    assertEquals(result2, false) // Should be false because it's shallow comparison
  })

  await t.step('should handle arrays as values', () => {
    const arr = [1, 2, 3]
    const object1 = { a: arr, b: 'test' }
    const object2 = { a: arr, b: 'test' } // Same array reference
    const result1 = shallowEqual(object1, object2)
    assertEquals(result1, true)

    // Different arrays with same content
    const object3 = { a: [1, 2, 3], b: 'test' }
    const object4 = { a: [1, 2, 3], b: 'test' }
    const result2 = shallowEqual(object3, object4)
    assertEquals(result2, false) // Should be false because arrays are different references
  })

  await t.step('should handle Date objects as values', () => {
    const date = new Date('2023-01-01')
    const object1 = { a: date, b: 'test' }
    const object2 = { a: date, b: 'test' } // Same Date reference
    const result1 = shallowEqual(object1, object2)
    assertEquals(result1, true)

    // Different Date objects with same value
    const object3 = { a: new Date('2023-01-01'), b: 'test' }
    const object4 = { a: new Date('2023-01-01'), b: 'test' }
    const result2 = shallowEqual(object3, object4)
    assertEquals(result2, false) // Should be false because Date objects are different references
  })

  await t.step('should handle function values', () => {
    const fn = () => 'test'
    const object1 = { a: fn, b: 'test' }
    const object2 = { a: fn, b: 'test' } // Same function reference
    const result1 = shallowEqual(object1, object2)
    assertEquals(result1, true)

    // Different functions with same implementation
    const object3 = { a: () => 'test', b: 'test' }
    const object4 = { a: () => 'test', b: 'test' }
    const result2 = shallowEqual(object3, object4)
    assertEquals(result2, false) // Should be false because functions are different references
  })
})
