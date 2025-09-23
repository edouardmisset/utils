import { assertEquals } from '@std/assert'
import { averageTime } from './average-time.ts'

Deno.test('averageTime function', async (t) => {
  await t.step('should return the average time', () => {
    const dates = [
      new Date('2022-01-01T09:00:00Z'),
      new Date('2022-01-01T11:00:00Z'),
    ]
    const result = averageTime(dates)
    assertEquals(result.error, undefined)
    assertEquals(result.data, '10:00:00')
  })

  await t.step(
    'should return the correct average time for dates spanning multiple days',
    () => {
      const dates = [
        new Date('2022-01-01T23:00:00Z'),
        new Date('2022-01-01T01:00:00Z'),
      ]
      const result = averageTime(dates)
      assertEquals(result.error, undefined)
      assertEquals(result.data, '12:00:00')
    },
  )

  await t.step(
    'should return "00:00:00" for an empty array',
    () => {
      const dates: Date[] = []
      const result = averageTime(dates)
      assertEquals(result.error, undefined)
      assertEquals(result.data, '00:00:00')
    },
  )
})
