import { assertEquals, assertInstanceOf } from '@std/assert'
import { datification } from './datification.ts'

Deno.test('datification', async (t) => {
  await t.step('should convert string to Date object', () => {
    const stringDate = '2022-01-01T12:00'
    const result = datification(stringDate)
    assertEquals(result.error, undefined)
    if (result.data) {
      assertEquals(
        result.data.getTime(),
        new Date(stringDate).getTime(),
      )
    }
  })

  await t.step(
    'should convert string in international date format to Date object',
    () => {
      const result = datification('2022-01-31')
      assertEquals(result.error, undefined)
      if (result.data) {
        assertInstanceOf(result.data, Date)
      }
    },
  )

  await t.step('should return the same Date object for Date input', () => {
    const date = new Date()
    const result = datification(date)
    assertEquals(result.error, undefined)
    if (result.data) {
      assertEquals(result.data.getTime(), date.getTime())
    }
  })

  await t.step(
    'should return an error if the date is not formatted as an ISO8601 date',
    () => {
      const result = datification('01012000')
      assertEquals(result.data, undefined)
      assertEquals(result.error?.message.includes('Invalid date format'), true)
    },
  )

  await t.step('returns error for invalid Date object', () => {
    // Invalid Date object
    const invalidDate = new Date('invalid')
    const result = datification(invalidDate)
    assertEquals(result.error instanceof TypeError, true)
    assertEquals(result.error?.message.includes('Invalid date format'), true)
  })
})
