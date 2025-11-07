import { isValidDate } from '@edouardmisset/date'
import type { ObjectOfType } from '@edouardmisset/type'

/**
 * Sorts objects by their date property.
 *
 * @defaults descending to true (newest first)
 *
 * @template T - Object type containing a date string property
 * @param {T} a - First object to compare
 * @param {T} b - Second object to compare
 * @param {object} [options] - Sort options
 * @param {boolean} [options.descending=true] - Sort direction (true = newest
 * first, false = oldest first)
 * @returns {number} Comparison result: negative (a before b), positive (a after
 * b), or zero (equal)
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Sort by date (newest first - default)
 * const events = [
 *   { id: 1, date: '2023-01-15', title: 'Old' },
 *   { id: 2, date: '2023-06-20', title: 'New' }
 * ]
 * const sorted = events.sort(sortByDate)
 * assertEquals(sorted[0].title, 'New')
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Sort chronologically (oldest first)
 * const events = [
 *   { id: 1, date: '2023-06-20', title: 'New' },
 *   { id: 2, date: '2023-01-15', title: 'Old' }
 * ]
 * const sorted = events.sort((a, b) => sortByDate(a, b, { descending: false }))
 * assertEquals(sorted[0].title, 'Old')
 * ```
 */
export function sortByDate<T extends ObjectOfType & { date: string }>(
  { date: aStringDate }: T,
  { date: bStringDate }: T,
  options?: { descending?: boolean },
): number {
  const { descending = true } = options ?? {}

  if (aStringDate === bStringDate) return 0

  const directionMultiplier = descending ? -1 : 1

  const aDate = new Date(aStringDate)
  const bDate = new Date(bStringDate)

  if (!isValidDate(aDate, bDate)) {
    globalThis.console.error('Invalid date format detected:', {
      aStringDate,
      bStringDate,
    })
    return 0
  }

  const aTime = aDate.getTime()
  const bTime = bDate.getTime()

  return directionMultiplier * (aTime - bTime)
}
