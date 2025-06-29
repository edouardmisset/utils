import { assertEquals } from '@std/assert'
import { average, averageTime } from './average.ts'

Deno.test('average function', async (t) => {
  await t.step('with multiple arguments', () => {
    const result1 = average(1, 2, 3, 4, 5)
    assertEquals(result1.error, undefined)
    assertEquals(result1.data, 3)

    const result2 = average(2, 4, 6, 8, 10)
    assertEquals(result2.error, undefined)
    assertEquals(result2.data, 6)

    const result3 = average(0, 0, 0, 0, 0)
    assertEquals(result3.error, undefined)
    assertEquals(result3.data, 0)
  })

  await t.step('with single array argument', () => {
    const result1 = average([1, 2, 3, 4, 5])
    assertEquals(result1.error, undefined)
    assertEquals(result1.data, 3)

    const result2 = average([2, 4, 6, 8, 10])
    assertEquals(result2.error, undefined)
    assertEquals(result2.data, 6)

    const result3 = average([0, 0, 0, 0, 0])
    assertEquals(result3.error, undefined)
    assertEquals(result3.data, 0)
  })

  await t.step('with no arguments', () => {
    const result = average()
    assertEquals(result.data, undefined)
    assertEquals(
      result.error?.message.includes(
        'Cannot calculate average if no values are passed in',
      ),
      true,
    )
  })
})

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
