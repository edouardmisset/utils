import { assertEquals } from '@std/assert'
import { buildSelectBy, createSelectBy } from './create-select-by.ts'

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

Deno.test('buildSelectBy (alias)', async (t) => {
  await t.step('should work as alias for createSelectBy', () => {
    const selectById = buildSelectBy('id')
    const result = selectById({ id: 1, name: 'John' })
    assertEquals(result, 1)
  })
})
