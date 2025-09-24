import { assertEquals } from '@std/assert'
import { selectAndTransform, pluckAndMap } from './select-and-transform.ts'

Deno.test('selectAndTransform', async (t) => {
  const objects = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]

  await t.step(
    'should apply a transformation function to the values specified by a key of each object in an array',
    () => {
      const result = selectAndTransform(
        objects,
        'name',
        (name) => name.toUpperCase(),
      )
      assertEquals(result, ['JOHN', 'JANE'])
    },
  )

  await t.step(
    'should skip objects that do not have the specified key during transformation',
    () => {
      const mixedObjects = [
        { id: 1, name: 'John' },
        { id: 2 }, // missing name key
        { id: 3, name: 'Bob' },
      ]
      const result = selectAndTransform(
        mixedObjects,
        'name',
        (name) => name?.toUpperCase() ?? '',
      )
      assertEquals(result, ['JOHN', 'BOB'])
    },
  )
})

Deno.test('pluckAndMap (alias)', async (t) => {
  await t.step('should work as alias for selectAndTransform', () => {
    const objects = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]
    const result = pluckAndMap(objects, 'name', (name) => name.toUpperCase())
    assertEquals(result, ['JOHN', 'JANE'])
  })
})