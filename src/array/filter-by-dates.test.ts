import { assertEquals } from 'asserts'
import { createFilter } from './filter-by-dates.ts'

Deno.test("createFilter", async t => {
  const data = [
    { date: new Date(2020, 0, 1) },
    { date: new Date(2021, 0, 1) },
    { date: new Date(2022, 0, 1) }
  ]

  await t.step('should filter an array of objects by a year', () => {
    const filter = createFilter('date', { year: 2020 })
    const result = data.filter(filter)
    assertEquals(result, [{ date: new Date(2020, 0, 1) }])
  })

  await t.step('should filter an array of objects by a date range', () => {
    const filter = createFilter('date', { startDate: new Date(2020, 6, 1), endDate: new Date(2020, 11, 31) })
    const result = data.filter(filter)
    assertEquals(result, [])
  })

  await t.step('should filter an array of objects by a duration from a reference date', () => {
    const almost6Months = 1000 * 60 * 60 * 24 * 180
    const filter = createFilter('date', { referenceDate: new Date(2020, 4, 1), duration: almost6Months }) // 180 days // 180 days
    const result = data.filter(filter)
    assertEquals(result, [{ date: new Date(2020, 0, 1) }])
  })

  await t.step('should return all objects if no valid options are provided', () => {
    const filter = createFilter('date')
    const result = data.filter(filter)
    assertEquals(result, data)
  })

  await t.step('should return all objects if the date key does not exist in the objects', () => {
    // @ts-expect-error: Testing a non-existent key. An error is expected.
    const result = data.filter(createFilter('nonexistentKey', { year: 2020 }))
    assertEquals(result, data)
  })

  await t.step('should return all objects if the date key is not a valid date', () => {
    const invalidData = [{ date: null }, { date: undefined }]
    const filter = createFilter('date', { year: 2020 })
    const result = invalidData.filter(filter)
    assertEquals(result, invalidData)
  })
})