import { assertEquals, assertThrows } from '@std/assert'
import { updateObjectInArray } from './update-array.ts'

Deno.test('updateObjectInArray', async (t) => {
  await t.step('should update an object in an array', () => {
    const array = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
    const result = updateObjectInArray(array, 'id', { id: 1, name: 'Updated' })
    assertEquals(result, [{ id: 1, name: 'Updated' }, { id: 2, name: 'Bob' }])
  })

  await t.step('should not update an object if the key does not match', () => {
    const array = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
    const result = updateObjectInArray(array, 'id', { id: 3, name: 'Updated' })
    assertEquals(result, array)
  })

  await t.step(
    'should throw an error if the key does not exist in newData',
    () => {
      const array = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
      assertThrows(() => updateObjectInArray(array, 'id', { name: 'Updated' }))
    },
  )

  await t.step('should handle an empty array', () => {
    const array: { id: number; name: string }[] = []
    const result = updateObjectInArray(array, 'id', { id: 1, name: 'Updated' })
    assertEquals(result, array)
  })
})
