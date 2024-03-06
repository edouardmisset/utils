import { assertEquals } from 'asserts'
import { maxBy } from './max-by.ts'

Deno.test('maxBy', async (t) => {
  const objects = [{ id: 1, value: 10 }, { id: 2, value: 5 }, {
    id: 3,
    value: 20,
  }]

  await t.step(
    'should return the object with the maximum value for a specific key',
    () => {
      const result = maxBy(objects, 'value')
      assertEquals(result, { id: 3, value: 20 })
    },
  )

  await t.step('should return undefined if the array is empty', () => {
    const result = maxBy([], 'value')
    assertEquals(result, undefined)
  })

  await t.step(
    'should return the first object if there are multiple objects with the maximum value',
    () => {
      const result = maxBy([{ id: 1, value: 10 }, { id: 2, value: 10 }, {
        id: 3,
        value: 10,
      }], 'value')
      assertEquals(result, { id: 3, value: 10 })
    },
  )
})
