import { isValidDate } from './is-valid-date.ts'

/**
 * Parses a date string in the format 'MM-DD-YYYY' and returns a Date object.
 *
 * @param {string} stringDate - The date string to parse, formatted as 'MM-DD-YYYY'.
 * @returns {Date} The parsed Date object.
 * @throws {Error} Throws an error if the date format is invalid or cannot be parsed.
 */
export function parseDate(stringDate: string): Date {
  const datePattern = /^(\d{2})-(\d{2})-(\d{4})$/
  const [, month, day, year] = datePattern.exec(stringDate) ?? []
  const parsedDate = new Date(`${year}-${month}-${day}`)

  if (!isValidDate(parsedDate)) {
    throw new Error('Invalid date format')
  }

  return parsedDate
}

/**
 * Parses a date string in the format 'DD-MM-YYYY' and returns a Date object.
 *
 * @param {string} stringDate - The date string to parse, formatted as 'DD-MM-YYYY'.
 * @returns {Date} The parsed Date object.
 * @throws {Error} Throws an error if the date format is invalid or cannot be parsed.
 */
export function parseFrenchDate(stringDate: string): Date {
  const datePattern = /^(\d{2})-(\d{2})-(\d{4})$/
  const [, day, month, year] = datePattern.exec(stringDate) ?? []
  const parsedDate = new Date(`${year}-${month}-${day}`)

  if (!isValidDate(parsedDate)) {
    throw new Error('Invalid date format')
  }

  return parsedDate
}
