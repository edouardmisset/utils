import { assertEquals } from '@std/assert'
import { collectionKeyBy, keyBy } from './collection-key-by.ts'

Deno.test('keyBy', async (t) => {
  await t.step(
    'should transform an array of objects into an object keyed by a specified key',
    () => {
      const array = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, {
        id: 3,
        name: 'Charlie',
      }]
      const key = 'id'
      assertEquals(keyBy(array, key), {
        '1': { id: 1, name: 'Alice' },
        '2': { id: 2, name: 'Bob' },
        '3': { id: 3, name: 'Charlie' },
      })
    },
  )

  await t.step('should return undefined for an empty array', () => {
    const array: Record<string, unknown>[] = []
    const key = 'id'
    assertEquals(keyBy(array, key), undefined)
  })
})

Deno.test('collectionKeyBy', async (t) => {
  await t.step(
    'should transform a collection of objects into an object keyed by a specified key',
    () => {
      const collection = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, {
        id: 3,
        name: 'Charlie',
      }]
      const key = 'id'
      assertEquals(collectionKeyBy(collection, key), {
        '1': { id: 1, name: 'Alice' },
        '2': { id: 2, name: 'Bob' },
        '3': { id: 3, name: 'Charlie' },
      })
    },
  )

  await t.step(
    'should transform an object of objects into an object keyed by a specified key',
    () => {
      const collection = {
        alice: { id: 1, name: 'Alice' },
        bob: { id: 2, name: 'Bob' },
        charlie: { id: 3, name: 'Charlie' },
      }
      const key = 'id'
      assertEquals(collectionKeyBy(collection, key), {
        '1': { id: 1, name: 'Alice' },
        '2': { id: 2, name: 'Bob' },
        '3': { id: 3, name: 'Charlie' },
      })
    },
  )

  await t.step('should return undefined for an empty collection', () => {
    const collection: Record<string, unknown>[] = []
    const key = 'id'
    assertEquals(collectionKeyBy(collection, key), undefined)
  })
})
