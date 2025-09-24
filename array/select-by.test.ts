import { assertEquals } from '@std/assert'
import { selectBy, pluckBy } from './select-by.ts'

Deno.test('selectBy', async (t) => {
  const objects = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]

  await t.step(
    'should select a specific key from each object in an array',
    () => {
      const result = selectBy(objects, 'name')
      assertEquals(result, ['John', 'Jane'])
    },
  )

  await t.step(
    'should skip objects that do not have the specified key',
    () => {
      const mixedObjects = [
        { id: 1, name: 'John' },
        { id: 2 }, // missing name key
        { id: 3, name: 'Bob' },
      ]
      const result = selectBy(mixedObjects, 'name')
      assertEquals(result, ['John', 'Bob'])
    },
  )
})

Deno.test('pluckBy (alias)', async (t) => {
  await t.step('should work as alias for selectBy', () => {
    const objects = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]
    const result = pluckBy(objects, 'name')
    assertEquals(result, ['John', 'Jane'])
  })
})
