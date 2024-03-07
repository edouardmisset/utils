import { assertEquals } from 'asserts'
import { omit } from './omit.ts'

Deno.test('omit', async (t) => {
  await t.step('should omit specified keys from an object', () => {
    const result = omit({ name: 'John', age: 30, city: 'New York' }, [
      'name',
      'city',
    ])
    assertEquals(result, { age: 30 })
  })

  await t.step('should return the same object if no keys are specified', () => {
    const result = omit({ name: 'John', age: 30, city: 'New York' }, [])
    assertEquals(result, { name: 'John', age: 30, city: 'New York' })
  })

  await t.step(
    'should return an empty object if all keys are specified',
    () => {
      const result = omit({ name: 'John', age: 30, city: 'New York' }, [
        'name',
        'age',
        'city',
      ])
      assertEquals(result, {})
    },
  )

  await t.step('should handle keys that are not in the object', () => {
    const result = omit({ name: 'John', age: 30, city: 'New York' }, [
      // @ts-expect-error - TS expect one of the object's key and'country' is not
      'country',
    ])
    assertEquals(result, { name: 'John', age: 30, city: 'New York' })
  })
})
