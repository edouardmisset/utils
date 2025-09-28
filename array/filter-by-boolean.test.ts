import { assertEquals } from '@std/assert'
import { filterByBoolean } from './filter-by-boolean.ts'

Deno.test('createBooleanFilter', async (t) => {
  await t.step('should filter objects by a boolean key', () => {
    const array = [{ bool: true }, { bool: false }, { bool: 'string' }]
    const result = filterByBoolean(array, 'bool')
    assertEquals(result, [{ bool: true }])
  })

  // Test with predicate function
  await t.step('should filter objects by a predicate function', () => {
    const array2 = [{ val: 1 }, { val: 0 }, { val: -1 }, { val: 2 }]
    const result2 = filterByBoolean(array2, (o) => o.val > 0)
    assertEquals(result2, [{ val: 1 }, { val: 2 }])
  })

  // Test with empty array
  await t.step('should return empty array when input is empty', () => {
    const emptyArray: { bool: boolean }[] = []
    const resultEmpty = filterByBoolean(emptyArray, 'bool')
    assertEquals(resultEmpty, [])
  })

  // Test with all false values
  await t.step(
    'should return empty array when no objects pass the test',
    () => {
      const array3 = [{ bool: false }, { bool: 0 }, { bool: '' }]
      const result3 = filterByBoolean(array3, 'bool')
      assertEquals(result3, [])
    },
  )
})
