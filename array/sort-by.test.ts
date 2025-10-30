import { assertEquals } from '@std/assert'
import { sortBy } from './sort-by.ts'

Deno.test('sortBy', async (t) => {
  const objectList = [{ id: 1, value: 10 }, { id: 2, value: 5 }, {
    id: 3,
    value: 20,
  }]

  await t.step(
    'should sort objects by a specific key in ascending order',
    () => {
      const result = sortBy(objectList, 'value', { descending: false })
      assertEquals(result, [{ id: 2, value: 5 }, { id: 1, value: 10 }, {
        id: 3,
        value: 20,
      }])
    },
  )

  await t.step(
    'should sort objects by a specific key in descending order',
    () => {
      const result = sortBy(objectList, 'value', { descending: true })
      assertEquals(result, [{ id: 3, value: 20 }, { id: 1, value: 10 }, {
        id: 2,
        value: 5,
      }])
    },
  )

  await t.step('should sort objects by a string key in ascending order', () => {
    const result = sortBy(
      [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }, {
        id: 3,
        name: 'Adam',
      }],
      'name',
      { descending: false },
    )
    assertEquals(result, [{ id: 3, name: 'Adam' }, { id: 2, name: 'Jane' }, {
      id: 1,
      name: 'John',
    }])
  })

  await t.step('should handle empty array', () => {
    const result = sortBy([], 'value', { descending: false })
    assertEquals(result, [])
  })

  await t.step('should handle array with one element', () => {
    const result = sortBy([{ id: 1, value: 10 }], 'value', {
      descending: false,
    })
    assertEquals(result, [{ id: 1, value: 10 }])
  })

  await t.step('should handle array with duplicate values', () => {
    const objectList2 = [{ id: 1, value: 10 }, { id: 2, value: 10 }, {
      id: 3,
      value: 5,
    }]
    const result = sortBy(objectList2, 'value', { descending: false })
    assertEquals(result, [{ id: 3, value: 5 }, { id: 1, value: 10 }, {
      id: 2,
      value: 10,
    }])
  })

  await t.step(
    'should default to ascending when options is not provided',
    () => {
      const result = sortBy(objectList, 'value')
      assertEquals(result, [{ id: 2, value: 5 }, { id: 1, value: 10 }, {
        id: 3,
        value: 20,
      }])
    },
  )

  await t.step(
    'should default to ascending when options is empty object',
    () => {
      const result = sortBy(objectList, 'value', {})
      assertEquals(result, [{ id: 2, value: 5 }, { id: 1, value: 10 }, {
        id: 3,
        value: 20,
      }])
    },
  )

  await t.step(
    'should return 0 for mixed types (string vs number) - sorts same types, returns 0 for different types',
    () => {
      const mixedObjects = [
        { id: 1, value: 'hello' },
        { id: 2, value: 42 },
        { id: 3, value: 'world' },
        { id: 4, value: 10 },
      ] satisfies { id: number; value: string | number }[]
      const result = sortBy(mixedObjects, 'value', { descending: false })
      // Numbers are sorted among themselves (10 < 42)
      // Strings maintain their order relative to each other
      // Mixed type comparisons return 0
      assertEquals(result, [
        { id: 1, value: 'hello' },
        { id: 4, value: 10 },
        { id: 2, value: 42 },
        { id: 3, value: 'world' },
      ])
    },
  )

  await t.step(
    'should handle object property values',
    () => {
      const objectsWithObjects = [
        { id: 1, value: { nested: 'a' } },
        { id: 2, value: { nested: 'b' } },
        { id: 3, value: 'string' },
      ] satisfies { id: number; value: { nested: string } | string }[]
      // @ts-expect-error - Testing edge case with object values
      const result = sortBy(objectsWithObjects, 'value', { descending: false })
      // Objects should maintain original order
      assertEquals(result, objectsWithObjects as typeof result)
    },
  )

  await t.step(
    'should trigger return 0 with boolean values (maintains stable sort)',
    () => {
      const objectsWithBooleans = [
        { id: 1, name: 'first', active: true },
        { id: 2, name: 'second', active: false },
        { id: 3, name: 'third', active: true },
      ] satisfies { id: number; name: string; active: boolean }[]
      // @ts-expect-error - Testing edge case with boolean values which aren't string | number
      const result = sortBy(objectsWithBooleans, 'active', {
        descending: false,
      })
      // Booleans don't match string or number types, so return 0 maintains original order
      assertEquals(result, objectsWithBooleans as unknown as typeof result)
    },
  )
})
