import { assertEquals } from 'asserts'
import { sortValues } from './sort-values.ts'

Deno.test('sortValues', async (t) => {
  await t.step('should sort values in ascending order by default', () => {
    const result = sortValues({ b: 1, a: 2, c: 3 })
    assertEquals(result, { b: 1, a: 2, c: 3 })
  })

  await t.step(
    'should sort values in ascending order when second argument is true',
    () => {
      const result = sortValues({ b: 1, a: 2, c: 3 }, { ascending: true })
      assertEquals(result, { b: 1, a: 2, c: 3 })
    },
  )

  await t.step(
    'should sort values in descending order when second argument is false',
    () => {
      const result = sortValues({ b: 1, a: 2, c: 3 }, { ascending: false })
      assertEquals(result, { c: 3, a: 2, b: 1 })
    },
  )

  await t.step('should handle an empty object', () => {
    const result = sortValues({}, { ascending: false })
    assertEquals(result, {})
  })

  await t.step(
    'should sort string values in ascending order by default',
    () => {
      const result = sortValues({ b: 'b', a: 'c', c: 'a' })
      assertEquals(result, { c: 'a', b: 'b', a: 'c' })
    },
  )

  await t.step(
    'should sort string values in descending order when second argument is false',
    () => {
      const result = sortValues({ b: 'b', a: 'c', c: 'a' }, {
        ascending: false,
      })
      assertEquals(result, { a: 'c', b: 'b', c: 'a' })
    },
  )
})
