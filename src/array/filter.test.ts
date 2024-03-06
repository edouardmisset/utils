import { assertEquals } from 'asserts'
import { createBooleanFilter, createDateFilter } from './filter.ts'

Deno.test("createDateFilter", async t => {
  await t.step('should filter dates by a specific year', () => {
    const filter = createDateFilter({ year: 2020 })
    const result = filter(new Date(2020, 0, 1))
    assertEquals(result, true)
  })

  await t.step('should filter dates by a date range', () => {
    const filter = createDateFilter({ startDate: new Date(2020, 6, 1), endDate: new Date(2020, 11, 31) })
    const result = filter(new Date(2020, 0, 1))
    assertEquals(result, false)
  })

  await t.step('should filter dates by a duration from a reference date', () => {
    const filter = createDateFilter({ referenceDate: new Date(2020, 4, 1), durationInMilliseconds: 1000 * 60 * 60 * 24 * 180 }) // 180 days
    const result = filter(new Date(2020, 0, 1))
    assertEquals(result, true)
  })
})

Deno.test("createBooleanFilter", async t => {
  await t.step('should filter objects by a boolean key', () => {
    const filterByBool = createBooleanFilter('bool')
    assertEquals(filterByBool({ bool: true }), true)
    assertEquals(filterByBool({ bool: false }), false)
    assertEquals(filterByBool({ bool: 'string' }), false)
  })
})