import { assertEquals } from 'asserts'
import { sortBy } from './sort-by.ts'

Deno.test("sortBy", async t => {
  const objects = [{ id: 1, value: 10 }, { id: 2, value: 5 }, { id: 3, value: 20 }]

  await t.step('should sort objects by a specific key in ascending order', () => {
    const result = sortBy(objects, 'value')
    assertEquals(result, [{ id: 2, value: 5 }, { id: 1, value: 10 }, { id: 3, value: 20 }])
  })

  await t.step('should sort objects by a specific key in descending order', () => {
    const result = sortBy(objects, 'value', false)
    assertEquals(result, [{ id: 3, value: 20 }, { id: 1, value: 10 }, { id: 2, value: 5 }])
  })

  await t.step('should sort objects by a string key in ascending order', () => {
    const result = sortBy([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }, { id: 3, name: 'Adam' }], 'name')
    assertEquals(result, [{ id: 3, name: 'Adam' }, { id: 2, name: 'Jane' }, { id: 1, name: 'John' }])
  })
})