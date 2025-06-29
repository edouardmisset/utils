import { assertEquals } from '@std/assert'
import { createFindBy } from './find.ts'

Deno.test('createFindBy', async (t) => {
  const objects = [{ id: 1, name: 'Object 1' }, { id: 2, name: 'Object 2' }]

  await t.step('should find an object by a specific key-value pair', () => {
    const findById = createFindBy('id')
    const findObject = findById(1)
    const result = objects.find(findObject)
    assertEquals(result, { id: 1, name: 'Object 1' })
  })

  await t.step('should find an object by a different key-value pair', () => {
    const findByName = createFindBy('name')
    const findObject = findByName('Object 2')
    const result = objects.find(findObject)
    assertEquals(result, { id: 2, name: 'Object 2' })
  })

  await t.step(
    'should return false if the key does not exist in the object',
    () => {
      const findByNonexistentKey = createFindBy('nonexistentKey')
      const findObject = findByNonexistentKey('value')
      const result = objects.find(findObject)
      assertEquals(result, undefined) // find returns undefined when predicate never returns true

      // Test the actual predicate behavior directly
      assertEquals(findObject(objects[0]), false)
      assertEquals(findObject(objects[1]), false)
    },
  )
})
