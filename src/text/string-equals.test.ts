import { stringEqualsCaseInsensitive } from './string-equals.ts'
import { assertEquals } from 'asserts'

Deno.test("stringEqualsCaseInsensitive", async t => {
  await t.step('should return true for equal strings regardless of case', () => {
    assertEquals(stringEqualsCaseInsensitive('Hello World', 'hello world'), true)
  })

  await t.step('should return false for unequal strings', () => {
    assertEquals(stringEqualsCaseInsensitive('Hello World', 'Goodbye World'), false)
  })

  await t.step('should return true for equal strings with different case', () => {
    assertEquals(stringEqualsCaseInsensitive('Hello World', 'HELLO WORLD'), true)
  })

  await t.step('should return false for unequal strings with different case', () => {
    assertEquals(stringEqualsCaseInsensitive('Hello World', 'GOODBYE WORLD'), false)
  })
})