/**
 * Calculates the distance between two strings.
 *
 * @param {string} source - the first string to compare against
 * @param {string} target - the second string
 * @returns {number} - The number of character difference
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Identical strings have distance 0
 * assertEquals(levenshteinDistance('hi', 'hi'), 0)
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Different strings
 * assertEquals(levenshteinDistance('hello', 'hi'), 4)
 * assertEquals(levenshteinDistance('kitten', 'sitting'), 3)
 * ```
 */
export function levenshteinDistance(source: string, target: string): number {
  if (!source.length) return target.length
  if (!target.length) return source.length

  const distanceGrid: number[][] = Array.from(
    { length: target.length + 1 },
    (_, currentIndex) => {
      const row = Array.from(
        { length: source.length + 1 },
        (_, comparisonIndex) => {
          if (currentIndex === 0) return comparisonIndex
          if (comparisonIndex === 0) return currentIndex

          const previousRow = currentIndex > 0
            ? distanceGrid[currentIndex - 1]
            : []
          return Math.min(
            (previousRow[comparisonIndex] ?? 0) + 1,
            row[comparisonIndex - 1] + 1,
            (previousRow[comparisonIndex - 1] ?? 0) +
              (source[comparisonIndex - 1] === target[currentIndex - 1]
                ? 0
                : 1),
          )
        },
      )
      return row
    },
  )
  return distanceGrid[target.length][source.length]
}
