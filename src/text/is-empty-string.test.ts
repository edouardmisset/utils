import { isEmptyStringOrNullish } from './is-empty-string.ts'
import { assertEquals } from 'asserts'

Deno.test("isEmptyStringOrNullish", async t => {
  await t.step('should return true for null', () => {
    assertEquals(isEmptyStringOrNullish(null), true)
  })

  await t.step('should return true for undefined', () => {
    assertEquals(isEmptyStringOrNullish(undefined), true)
  })

  await t.step('should return true for empty string', () => {
    assertEquals(isEmptyStringOrNullish(''), true)
  })

  await t.step('should return true for string with only spaces', () => {
    assertEquals(isEmptyStringOrNullish('   '), true)
  })

  await t.step('should return false for non-empty string', () => {
    assertEquals(isEmptyStringOrNullish('Hello World'), false)
  })
})