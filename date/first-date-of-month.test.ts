import { assertEquals } from '@std/assert'
import { firstDateOfMonth } from './first-date-of-month.ts'

Deno.test('firstDateOfMonth', async (t) => {
  await t.step(
    'should return the first date of the current month when no argument is passed',
    () => {
      const result = firstDateOfMonth()
      const expected = new Date()
      expected.setDate(1)
      assertEquals(result.getDate(), expected.getDate())
      assertEquals(result.getMonth(), expected.getMonth())
      assertEquals(result.getFullYear(), expected.getFullYear())
    },
  )

  await t.step('should return the first date of the specified month', () => {
    const date = new Date(2022, 11, 25) // December 25, 2022
    const result = firstDateOfMonth(date)
    const expected = new Date(2022, 11, 1) // December 1, 2022
    assertEquals(result, expected)
  })
})
