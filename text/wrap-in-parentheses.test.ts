import { assertEquals } from '@std/assert'
import { wrapInParentheses } from './wrap-in-parentheses.ts'

Deno.test('wrapInParentheses function', async (t) => {
  await t.step(
    'should return an empty string when the input is zero',
    () => {
      const result = wrapInParentheses(0)
      assertEquals(result, '')
    },
  )

  await t.step(
    'should return an empty string when the input is negative',
    () => {
      const result = wrapInParentheses(-10)
      assertEquals(result, '')
    },
  )

  await t.step(
    'should wrap a positive number in parentheses',
    () => {
      const result = wrapInParentheses(5)
      assertEquals(result, '(5)')
    },
  )

  await t.step(
    'should handle large numbers correctly',
    () => {
      const result = wrapInParentheses(987_654_321)
      assertEquals(result, '(987654321)')
    },
  )
})
