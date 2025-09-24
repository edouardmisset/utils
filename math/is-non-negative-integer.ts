// https://en.wikipedia.org/wiki/Sign_(mathematics)#Sign_of_zero
export function isNonNegativeInteger(value: unknown): boolean {
  return typeof value === 'number' && Number.isInteger(value) && 0 <= value
}