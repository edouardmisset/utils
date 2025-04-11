import { assertEquals } from '@std/assert'
import { isDateCompatible } from './is-date-compatible.ts'

Deno.test('isDateCompatible function', async (t) => {
  await t.step('should return true for a Date object', () => {
    const result = isDateCompatible(new Date())
    assertEquals(result, true)
  })

  await t.step('should return true for a string', () => {
    const result = isDateCompatible('2025-04-11')
    assertEquals(result, true)
  })

  await t.step('should return true for a number (timestamp)', () => {
    const result = isDateCompatible(1_681_209_600_000)
    assertEquals(result, true)
  })

  await t.step(
    'should return false for a non-date-compatible value type',
    () => {
      const result = isDateCompatible({})
      assertEquals(result, false)
    },
  )
})
