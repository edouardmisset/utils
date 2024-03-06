import { assertEquals } from 'asserts'
import { createSelectBy, selectAndTransform, selectBy } from './select-by.ts'

Deno.test('selectBy', async (t) => {
  const objects = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]

  await t.step(
    'should select a specific key from each object in an array',
    () => {
      const result = selectBy(objects, 'name')
      assertEquals(result, ['John', 'Jane'])
    },
  )
})

Deno.test('createSelectBy', async (t) => {
  const selectByName = createSelectBy('name')

  await t.step(
    'should create a function that selects a specific key from a given object',
    () => {
      const result = selectByName({ id: 1, name: 'John' })
      assertEquals(result, 'John')
    },
  )

  await t.step(
    'should return undefined if the key does not exist in the object',
    () => {
      const result = selectByName({ id: 1 })
      assertEquals(result, undefined)
    },
  )
})

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
})
