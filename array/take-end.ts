/** Returns the last `n` elements from the given array. */
export function takeEnd<T>(array: T[], n = 1): T[] {
  return array.slice(-Math.abs(n))
}

/** Alias for the {@link takeEnd} function. */
export const getLastElements: typeof takeEnd = takeEnd
