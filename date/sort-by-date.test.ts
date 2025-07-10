import { assertEquals } from '@std/assert'
import { sortByDate } from './sort-by-date.ts'



Deno.test('sortByDate', async (t) => {
  const dateA = { date: '2024-01-01', id: 1 }
  const dateB = { date: '2024-02-15', id: 2 }
  const dateC = { date: '2023-12-25', id: 3 }
  const equalDate1 = { date: '2024-03-10', id: 4 }
  const equalDate2 = { date: '2024-03-10', id: 5 }
  const invalidDate = { date: 'invalid-date', id: 6 }

  await t.step('should sort dates in descending order by default (newest first)', () => {
    const unsortedArray = [dateA, dateB, dateC]
    const sortedArray = [...unsortedArray].sort(sortByDate)

    assertEquals(
      sortedArray.map(item => item.id),
      [2, 1, 3], // dateB (Feb '24), dateA (Jan '24), dateC (Dec '23)
    )
  })

  await t.step('should sort dates in ascending order when descending is false (oldest first)', () => {
    const unsortedArray = [dateA, dateB, dateC]
    const sortedArray = [...unsortedArray].sort((a, b) =>
      sortByDate(a, b, { descending: false }),
    )

    assertEquals(
      sortedArray.map(item => item.id),
      [3, 1, 2], // dateC (Dec), dateA (Jan), dateB (Feb)
    )
  })

  await t.step('should return 0 for equal dates', () => {
    const result = sortByDate(equalDate1, equalDate2)
    assertEquals(result, 0)
  })

  await t.step('should handle invalid dates by returning 0', () => {
    const result = sortByDate(dateA, invalidDate)

    assertEquals(result, 0)
  })

  await t.step('should sort an array with multiple dates correctly', () => {
    const unsortedArray = [dateB, dateC, dateA, equalDate1, equalDate2]
    const sortedArray = [...unsortedArray].sort(sortByDate)

    // Expected order: equalDate1/2 (Mar '24), dateB (Feb '24), dateA (Jan '24), dateC (Dec '23)
    assertEquals(
      sortedArray.map(item => item.id),
      [4, 5, 2, 1, 3],
    )
  })

  await t.step('should work with empty options object', () => {
    const unsortedArray = [dateA, dateB, dateC]
    const sortedArray = [...unsortedArray].sort((a, b) =>
      sortByDate(a, b, {}),
    )

    assertEquals(
      sortedArray.map(item => item.id),
      [2, 1, 3], // dateB (Feb '24), dateA (Jan '24), dateC (Dec '23) - default descending
    )
  })

  await t.step('should explicitly work with descending: true', () => {
    const unsortedArray = [dateA, dateB, dateC]
    const sortedArray = [...unsortedArray].sort((a, b) =>
      sortByDate(a, b, { descending: true }),
    )

    assertEquals(
      sortedArray.map(item => item.id),
      [2, 1, 3], // dateB (Feb '24), dateA (Jan '24), dateC (Dec '23)
    )
  })

  await t.step('should handle mixed valid and invalid dates', () => {
    const mixedDates = [dateA, invalidDate, dateB]
    const sortedArray = [...mixedDates].sort(sortByDate)

    // Invalid dates should be handled gracefully, valid dates should be sorted
    assertEquals(sortedArray.length, 3)
    // The exact order may vary due to invalid date handling, but should not throw
  })

  await t.step('should handle ISO date strings correctly', () => {
    const isoDate1 = { date: '2024-01-01T10:00:00Z', id: 1 }
    const isoDate2 = { date: '2024-01-01T15:00:00Z', id: 2 }

    const sortedArray = [isoDate1, isoDate2].sort(sortByDate)

    // Later time should come first (descending)
    assertEquals(
      sortedArray.map(item => item.id),
      [2, 1],
    )
  })
})
