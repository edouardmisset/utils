import { assertEquals } from '@std/assert'
import { isDateInDuration } from './is-date-in-duration.ts'

Deno.test('isDateInDuration function', async (t) => {
  const referenceDate = new Date('2025-04-11T12:00:00Z')
  const oneHourInMilliseconds = 3_600_000

  const testCases = [
    {
      name: 'should return true when the date is within the duration',
      date: new Date('2025-04-11T11:30:00Z'),
      expected: true,
    },
    {
      name: 'should return false when the date is before the duration',
      date: new Date('2025-04-11T10:30:00Z'),
      expected: false,
    },
    {
      name: 'should return false when the date is after the duration',
      date: new Date('2025-04-11T12:30:01Z'),
      expected: false,
    },
    {
      name:
        'should handle edge case where the date is exactly at the start of the duration',
      date: new Date('2025-04-11T11:00:00Z'),
      expected: true,
    },
    {
      name:
        'should handle edge case where the date is exactly at the end of the duration',
      date: new Date('2025-04-11T12:00:00Z'),
      expected: true,
    },
  ]

  for (const { name, date, expected } of testCases) {
    await t.step(name, () => {
      const result = isDateInDuration(date, {
        referenceDate,
        durationInMS: oneHourInMilliseconds,
      })
      assertEquals(result, expected)
    })
  }
})
