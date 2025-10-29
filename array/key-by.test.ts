import { assertEquals } from '@std/assert'
import { keyBy } from './key-by.ts'

const userCollection = {
  '1': { id: 1, name: 'Alice' },
  '2': { id: 2, name: 'Bob' },
  '3': { id: 3, name: 'Charlie' },
} as const

Deno.test('keyBy', async (t) => {
  await t.step(
    'should transform an array of objects into an object keyed by a specified key',
    () => {
      const array = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, {
        id: 3,
        name: 'Charlie',
      }]
      const key = 'id'
      assertEquals(keyBy(array, key), userCollection)
    },
  )

  await t.step('should return undefined for an empty array', () => {
    const array: Record<string, unknown>[] = []
    const key = 'id'
    assertEquals(keyBy(array, key), undefined)
  })

  await t.step('should filter out objects with undefined or null key values', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: undefined, name: 'Bob' },
      { id: 3, name: 'Charlie' },
      { id: null, name: 'Dave' },
      { id: 5, name: 'Eve' },
    ]
    const key = 'id'
    const expected = {
      '1': { id: 1, name: 'Alice' },
      '3': { id: 3, name: 'Charlie' },
      '5': { id: 5, name: 'Eve' },
    }
    assertEquals(keyBy(array, key), expected)
  })
})
