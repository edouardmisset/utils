import { assertEquals } from '@std/assert'
import { minBy } from './min-by.ts'

Deno.test('minBy', async (t) => {
  const objects = [{ id: 1, value: 10 }, { id: 2, value: 5 }, {
    id: 3,
    value: 20,
  }]

  await t.step(
    'should return the object with the minimum value for a specific key',
    () => {
      const result = minBy(objects, 'value')
      assertEquals(result, { id: 2, value: 5 })
    },
  )

  await t.step(
    'should return the first object if there are multiple objects with the minimum value',
    () => {
      const result = minBy([{ id: 1, value: 10 }, { id: 2, value: 10 }, {
        id: 3,
        value: 10,
      }], 'value')
      assertEquals(result, { id: 3, value: 10 })
    },
  )
})
