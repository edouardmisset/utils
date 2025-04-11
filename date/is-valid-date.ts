/**
 * Checks if the given dates are valid.
 *
 * @param {...unknown[]} dates - The dates to check.
 * @returns {boolean} - True if all dates are valid, false otherwise.
 */
export function isValidDate(...dates: unknown[]): boolean {
  for (const date of dates) {
    if (
      !(date instanceof Date) || Number.isNaN(date.getTime()) ||
      date.toString() === 'Invalid Date'
    ) {
      return false
    }
  }

  return true
}
