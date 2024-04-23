import { assertEquals } from '@std/assert'
import { groupBy } from './group-by.ts'

Deno.test('groupBy', async (t) => {
  const objects = [{ id: 1, name: 'Object 1' }, { id: 2, name: 'Object 2' }, {
    id: 1,
    name: 'Object 3',
  }]

  await t.step('should group objects by a specific key', () => {
    const result = groupBy(objects, 'id')
    assertEquals(result, {
      '1': [{ id: 1, name: 'Object 1' }, { id: 1, name: 'Object 3' }],
      '2': [{ id: 2, name: 'Object 2' }],
    })
  })

  await t.step('should group objects by a different key', () => {
    const result = groupBy(objects, 'name')
    assertEquals(result, {
      'Object 1': [{ id: 1, name: 'Object 1' }],
      'Object 2': [{ id: 2, name: 'Object 2' }],
      'Object 3': [{ id: 1, name: 'Object 3' }],
    })
  })

  await t.step('should return an empty object if the array is empty', () => {
    const result = groupBy([], 'id')
    assertEquals(result, {})
  })
})
