/** Returns the first `n` elements from the given array. */
export function takeStart<T>(array: T[], n = 1): T[] {
  return array.slice(0, Math.abs(n))
}

/** Alias for the {@link takeStart} function. */
export const getFirstElements: typeof takeStart = takeStart
