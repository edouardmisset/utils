import { assertEquals } from '@std/assert'
import { findAndUpdate } from './find-and-update.ts'

Deno.test('findAndUpdate', async (t) => {
  await t.step('should update an object in an array', () => {
    const array = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
    const result = findAndUpdate({
      array,
      key: 'id',
      value: 1,
      updates: { name: 'Updated' },
    })
    assertEquals(result, [{ id: 1, name: 'Updated' }, { id: 2, name: 'Bob' }])
  })

  await t.step('should not update an object if the key does not match', () => {
    const array = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
    const result = findAndUpdate({
      array,
      key: 'id',
      value: 3,
      updates: { name: 'Updated' },
    })
    assertEquals(result, array)
  })

  await t.step('should handle an empty array', () => {
    const array: { id: number; name: string }[] = []
    const result = findAndUpdate({
      array,
      key: 'id',
      value: 1,
      updates: { name: 'Updated' },
    })
    assertEquals(result, array)
  })
})
