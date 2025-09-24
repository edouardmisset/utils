/** Returns the first date of the month for a given date. */
export function firstDateOfMonth(date: Date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}
