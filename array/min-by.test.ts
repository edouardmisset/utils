import { assertEquals } from '@std/assert'
import { minBy } from './min-by.ts'
import { minByFixture } from './min-by.fixture.ts'

Deno.test('minBy', async (t) => {
  const objects = minByFixture

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

  await t.step(
    'should return undefined if the array is empty',
    () => {
      assertEquals(minBy([], 'value'), undefined)
    },
  )
})
