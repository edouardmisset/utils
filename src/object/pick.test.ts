import { assertEquals } from '@std/assert'
import { pick } from './pick.ts'

Deno.test('pick', async (t) => {
  await t.step('should pick specified keys from an object', () => {
    const result = pick({ name: 'John', age: 30, city: 'New York' }, [
      'name',
      'city',
    ])
    assertEquals(result, { name: 'John', city: 'New York' })
  })

  await t.step('should return an empty object if no keys are specified', () => {
    const result = pick({ name: 'John', age: 30, city: 'New York' }, [])
    assertEquals(result, {})
  })

  await t.step(
    'should return the same object if all keys are specified',
    () => {
      const result = pick({ name: 'John', age: 30, city: 'New York' }, [
        'name',
        'age',
        'city',
      ])
      assertEquals(result, { name: 'John', age: 30, city: 'New York' })
    },
  )
})
