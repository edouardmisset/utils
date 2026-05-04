import { assertEquals } from '@std/assert'
import { selectBy } from './select-by.ts'
import { selectByFixture } from './select-by.fixture.ts'

Deno.test('selectBy', async (t) => {
  const objects = selectByFixture

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
