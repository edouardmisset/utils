import { assertEquals } from '@std/assert'
import { updateObjectInArray } from './update-array.ts'

Deno.test('updateObjectInArray', async (t) => {
  await t.step('should update an object in an array', () => {
    const array = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
    const { data, error } = updateObjectInArray(array, 'id', {
      id: 1,
      name: 'Updated',
    })
    assertEquals(error, undefined)
    assertEquals(data, [{ id: 1, name: 'Updated' }, { id: 2, name: 'Bob' }])
  })

  await t.step('should not update an object if the key does not match', () => {
    const array = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
    const { data, error } = updateObjectInArray(array, 'id', {
      id: 3,
      name: 'Updated',
    })
    assertEquals(error, undefined)
    assertEquals(data, array)
  })

  await t.step(
    'should return an error if the key does not exist in newData',
    () => {
      const array = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
      const { data, error } = updateObjectInArray(array, 'id', {
        name: 'Updated',
      })
      assertEquals(data, undefined)
      assertEquals(error?.message, 'The key id does not exist in newData')
    },
  )

  await t.step('should handle an empty array', () => {
    const array: { id: number; name: string }[] = []
    const { data, error } = updateObjectInArray(array, 'id', {
      id: 1,
      name: 'Updated',
    })
    assertEquals(error, undefined)
    assertEquals(data, array)
  })
})
