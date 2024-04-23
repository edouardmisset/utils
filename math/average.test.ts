import { assertEquals, assertThrows } from '@std/assert'
import { average, averageTime } from './average.ts'

Deno.test('average function', async (t) => {
  await t.step('with multiple arguments', () => {
    assertEquals(average(1, 2, 3, 4, 5), 3)
    assertEquals(average(2, 4, 6, 8, 10), 6)
    assertEquals(average(0, 0, 0, 0, 0), 0)
  })

  await t.step('with single array argument', () => {
    assertEquals(average([1, 2, 3, 4, 5]), 3)
    assertEquals(average([2, 4, 6, 8, 10]), 6)
    assertEquals(average([0, 0, 0, 0, 0]), 0)
  })

  await t.step('with no arguments', () => {
    assertThrows(() => average())
  })
})

Deno.test('averageTime function', async (t) => {
  await t.step('should return the average time', () => {
    const dates = [
      new Date('2022-01-01T09:00:00Z'),
      new Date('2022-01-01T11:00:00Z'),
    ]
    const result = averageTime(dates)
    assertEquals(result, '10:00:00')
  })

  await t.step(
    'should return the correct average time for dates spanning multiple days',
    () => {
      const dates = [
        new Date('2022-01-01T23:00:00Z'),
        new Date('2022-01-01T01:00:00Z'),
      ]
      const result = averageTime(dates)
      assertEquals(result, '12:00:00')
    },
  )

  await t.step(
    'should return "00:00:00" for an empty array',
    () => {
      const dates: Date[] = []
      const result = averageTime(dates)
      assertEquals(result, '00:00:00')
    },
  )
})
