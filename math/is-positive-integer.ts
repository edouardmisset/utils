// https://en.wikipedia.org/wiki/Sign_(mathematics)#Sign_of_zero
export function isPositiveInteger(value: number): boolean {
  return Number.isInteger(value) && 0 < value
}

