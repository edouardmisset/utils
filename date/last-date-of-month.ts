/** Returns the last date of the month for a given date. */
export function lastDateOfMonth(date: Date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}
//
